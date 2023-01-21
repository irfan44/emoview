import { Breadcrumb, Modal, Tabs } from 'antd';
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

  const [accessToken, setAccessToken] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BE_ENDPOINT;
  const socket = io(baseURL);

  const fetchMeetingById = async () => {
    try {
      const data = await getMeetingById(id);
      setMeetingData(data);
      fetchRecognitionOverview(data.code, ' ');
      fetchMeetingParticipants(id);

      socket.on('connect', () => {
        socket.emit('join', data.code);
      });

      socket.on('USER_JOINED', () => {
        fetchMeetingParticipants(id);
      });

      if (data.isStart) {
        socket.on('RECOGNITION_DATA_ADDED', () => {
          fetchRecognitionOverview(data.code, 10);
          console.log('FER:: Recognition Running');
        });
      }
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
    await setMeetingStatus(id, true, false);
    fetchMeetingById();
  };

  const handleStopMeeting = async () => {
    await setMeetingStatus(id, true, true);
    fetchMeetingById();
  };

  const handleStartRecognition = async () => {
    await startRecognition(meetingData.code);
    fetchMeetingById();
  };

  const handleStopRecognition = async () => {
    await stopRecognition(meetingData.code);
    fetchMeetingById();
  };

  const handleDeleteMeeting = () => {
    confirm({
      title: 'Do you want to delete this meeting?',
      content: 'Warning : You cannot change this later!',
      okText: 'Delete',
      okType: 'danger',
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
    fetchMeetingById();
    getSwitchStatus();
    getAccessToken();
  }, []);

  return (
    <>
      {meetingData && (
        <PageLayout>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/meetings">Meetings</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{meetingData.name}</Breadcrumb.Item>
          </Breadcrumb>
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
          />
          {meetingData.isStart ? (
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: `Recognition`,
                  key: 'recognition',
                  children: (
                    <Recognition
                      recogDetail={recognitionsDetail}
                      recogOverview={recognitionsOverview}
                      recogSummary={recognitionsSummary}
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
          ) : (
            <EmptyHolder title="Start meeting & recognition to see emotion data!" />
          )}
        </PageLayout>
      )}
    </>
  );
};

export default MeetingDetails;
