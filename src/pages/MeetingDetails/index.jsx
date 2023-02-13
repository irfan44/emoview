import { Modal, Spin, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  getMeetingById,
  getMeetingParticipants,
  removeMeeting,
  setMeetingStatus,
  startRecognition,
  stopRecognition,
} from '../../api/meeting';
import { getRecognition } from '../../api/recognition';
import PageLayout from '../../components/layout/PageLayout';
import Header from '../../components/meetingDetails/Header';
import ParticipantList from '../../components/meetingDetails/ParticipantList';
import Recognition from '../../components/meetingDetails/Recognition';
import EmptyHolder from '../../components/placeholders/EmptyHolder';

const { confirm } = Modal;

const MeetingDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meetingData, setMeetingData] = useState({
    _id: '',
    name: '',
    subject: '',
    description: '',
    link: '',
    code: '',
    createdBy: '',
    isStart: false,
    startedAt: '',
    isEnded: false,
    endedAt: null,
    configuration: {
      notification: '',
      sound: '',
      remindBelow: '',
      size: '',
      emotionDisplay: '',
    },
  });
  const [recognitionStatus, setRecognitionStatus] = useState();
  const [recognitionsDetail, setRecognitionsDetail] = useState();
  const [recognitionsOverview, setRecognitionsOverview] = useState({});
  const [recognitionsSummary, setRecognitionsSummary] = useState();
  const [meetingParticipants, setMeetingParticipants] = useState([]);

  const [isLoadingStart, setIsLoadingStart] = useState(false);
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);

  const [accessToken, setAccessToken] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BE_ENDPOINT;
  const socket = io(baseURL, { transports: ['websocket'], upgrade: false });

  const handleOnMount = async () => {
    try {
      setIsLoading(true);
      const data = await getMeetingById(id);
      setMeetingData(data);
      fetchRecognitionOverview(data.code, ' ');
      fetchMeetingParticipants(id);
      setIsLoading(false);

      socket.on('connect', () => {
        socket.emit('join', data.code);
      });

      socket.on('USER_JOINED', () => {
        fetchMeetingParticipants(id);
      });

      socket.on('RECOGNITION_DATA_ADDED', () => {
        fetchRecognitionOverview(data.code, ' ');
        console.log('FER:: Recognition Running');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeetingById = async () => {
    try {
      const data = await getMeetingById(id);
      setMeetingData(data);
      fetchRecognitionOverview(data.code, ' ');
      fetchMeetingParticipants(id);
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessToken = async () => {
    const accessToken = await window.electronAPI.getAccessToken();
    setAccessToken(accessToken);
  };

  const openInMeeting = async () => {
    await window.electronAPI.openFloating(id, accessToken);
  };

  const handleStartMeeting = async () => {
    setIsLoadingStart(true);
    await setMeetingStatus(id, true, false);
    fetchMeetingById();
  };

  const handleStopMeeting = async () => {
    confirm({
      title: 'Do you want to end this meeting?',
      content: (
        <span>
          Warning : You <strong>cannot</strong> change this later!
        </span>
      ),
      okText: 'End',
      okType: 'danger',
      okButtonProps: { type: 'primary' },
      cancelButtonProps: { type: 'text' },
      onOk: async () => {
        await setMeetingStatus(id, true, true);
        fetchMeetingById();
      },
    });

    setIsLoadingEnd(false);
  };

  const handleStartRecognition = async () => {
    await startRecognition(meetingData.code);
    handleOnMount();
  };

  const handleStopRecognition = async () => {
    await stopRecognition(meetingData.code);
    fetchMeetingById();
  };

  const handleDeleteMeeting = () => {
    confirm({
      title: 'Do you want to delete this meeting?',
      content: (
        <span>
          Warning : You <strong>cannot</strong> change this later!
        </span>
      ),
      okText: 'Delete',
      okType: 'danger',
      okButtonProps: { type: 'primary' },
      cancelButtonProps: { type: 'text' },
      onOk: async () => {
        await removeMeeting(id);
        navigate('/meetings');
      },
    });
  };

  const handleSwitch = (checked) => {
    if (checked) {
      handleStartRecognition();
      localStorage.setItem(`meeting/${id}/started`, checked);
    } else {
      handleStopRecognition();
      localStorage.removeItem(`meeting/${id}/started`);
    }
  };

  const getSwitchStatus = () => {
    const status = localStorage.getItem(`meeting/${id}/started`);
    if (status === null) {
      setRecognitionStatus(false);
    } else {
      setRecognitionStatus(true);
    }
  };

  const fetchRecognitionOverview = async (id, limit) => {
    try {
      const data = await getRecognition(id, limit);
      setRecognitionsDetail(data.recognitionsDetail);
      setRecognitionsOverview(data.recognitionsOverview);
      setRecognitionsSummary(data.recognitionsSummary);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeetingParticipants = async (id) => {
    try {
      const data = await getMeetingParticipants(id);
      setMeetingParticipants(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleOnMount();
    getSwitchStatus();
    getAccessToken();

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {meetingData && (
        <PageLayout>
          <div className="flex space-x-0.5">
            <div>
              <Link
                className="text-black/[.60] px-1 rounded-md h-[22px] -ml-1 hover:text-black hover:bg-black/[.06]"
                to="/meetings"
              >
                Meetings
              </Link>
            </div>
            <div>
              <span className="text-black/[.60] ">/</span>
            </div>
            <div className="text-black/[.60] px-1">{meetingData.name}</div>
          </div>
          <Header
            name={meetingData.name}
            subject={meetingData.subject}
            description={meetingData.description}
            link={meetingData.link}
            isStart={meetingData.isStart}
            isEnded={meetingData.isEnded}
            recognitionStatus={recognitionStatus}
            handleStartMeeting={handleStartMeeting}
            handleStopMeeting={handleStopMeeting}
            handleDeleteMeeting={handleDeleteMeeting}
            handleSwitch={handleSwitch}
            openInMeeting={openInMeeting}
            fetchMeetingById={fetchMeetingById}
            meetingData={meetingData}
            isLoadingStart={isLoadingStart}
            isLoadingEnd={isLoadingEnd}
          />
          {meetingData.isStart ? (
            <Tabs
              className="mt-2"
              defaultActiveKey="1"
              tabBarStyle={{ borderBottom: '0px' }}
              items={[
                {
                  label: `Recognition`,
                  key: 'recognition',
                  children: (
                    <Recognition
                      recogDetail={recognitionsDetail}
                      recogOverview={recognitionsOverview}
                      recogSummary={recognitionsSummary}
                      withImage={false}
                    />
                  ),
                },
                {
                  label: `Participants`,
                  key: 'participants',
                  children: (
                    <ParticipantList
                      id={id}
                      meetingParticipants={meetingParticipants}
                    />
                  ),
                },
              ]}
            />
          ) : isLoading ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <Spin />
            </div>
          ) : (
            <EmptyHolder title="Start meeting & recognition to see emotion data!" />
          )}
        </PageLayout>
      )}
    </>
  );
};

export default MeetingDetails;
