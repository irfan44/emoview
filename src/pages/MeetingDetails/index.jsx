import { Modal, Spin, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  getMeetingByEmoviewCode,
  getMeetingParticipants,
  removeMeeting,
  setMeetingStatus,
  startRecognition,
  stopRecognition,
} from '../../api/meeting.js';
import { getRecognition } from '../../api/recognition.js';
import PageLayout from '../../components/layout/PageLayout.jsx';
import Header from '../../components/meetingDetails/Header.jsx';
import ParticipantList from '../../components/meetingDetails/ParticipantList.jsx';
import Recognition from '../../components/meetingDetails/Recognition.jsx';
import EmptyHolder from '../../components/placeholders/EmptyHolder.jsx';
import PageLoading from '../../components/loading/PageLoading.jsx';
import {
  getClassDetailByMeetCode,
  updateMeetingCount,
} from '../../api/class.js';
import MeetingDetailsTour from '../../components/tour/MeetingDetailsTour/index.jsx';
import PreStartMeetingTour from '../../components/tour/PreStartMeetingTour/index.jsx';
import isElectron from '../../utils/isElectron.js';

const { confirm } = Modal;

const MeetingDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meetingData, setMeetingData] = useState();
  const [recognitionStatus, setRecognitionStatus] = useState();
  const [recognitionsDetail, setRecognitionsDetail] = useState();
  const [recognitionsOverview, setRecognitionsOverview] = useState({});
  const [recognitionsSummary, setRecognitionsSummary] = useState();
  const [meetingParticipants, setMeetingParticipants] = useState([]);

  const [isLoadingStart, setIsLoadingStart] = useState(false);
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);

  const [accessToken, setAccessToken] = useState();

  const startMeetingRef = useRef(null);
  const meetingCodeRef = useRef(null);
  const recognitionSwitchRef = useRef(null);
  const refreshRef = useRef(null);
  const floatingDisplayRef = useRef(null);
  const endRecognitionRef = useRef(null);
  const dropdownRef = useRef(null);

  const { meetCode, emoviewCode } = useParams();
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BE_ENDPOINT;
  const socket = io(baseURL, { transports: ['websocket'], upgrade: false });

  const handleOnMount = async () => {
    try {
      setIsLoading(true);
      const data = await getMeetingByEmoviewCode({ emoviewCode });
      setMeetingData(data[0]);
      fetchRecognitionOverview(emoviewCode, ' ');
      fetchMeetingParticipants(emoviewCode);
      setIsLoading(false);

      socket.on('connect', () => {
        socket.emit('join', emoviewCode);
      });

      socket.on('USER_JOINED', () => {
        fetchMeetingParticipants(emoviewCode);
      });

      socket.on('RECOGNITION_DATA_ADDED', () => {
        fetchRecognitionOverview(emoviewCode, ' ');
        console.log('FER:: Recognition Running');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeetingById = async () => {
    try {
      const data = await getMeetingByEmoviewCode({ emoviewCode });
      setMeetingData(data[0]);
      await fetchRecognitionOverview(emoviewCode, ' ');
      await fetchMeetingParticipants(emoviewCode);
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessToken = async () => {
    if (!isElectron()) {
      const accessToken = localStorage.getItem('accessToken');
      setAccessToken(accessToken);
    } else {
      const accessToken = await window.electronAPI.getAccessToken();
      setAccessToken(accessToken);
    }
  };

  const openInMeeting = async () => {
    if (isElectron()) {
      await window.electronAPI.openFloating(emoviewCode, accessToken);
    } else {
      window.open(
        `${
          import.meta.env.VITE_APP_ROOT_URL
        }/in-meeting-display?id=${emoviewCode}&accessToken=${accessToken}`,
        '_blank',
        'location=yes,height=320,width=260,scrollbars=yes,status=yes'
      );
    }
  };

  const handleStartMeeting = async () => {
    setIsLoadingStart(true);
    await setMeetingStatus({
      emoviewCode,
      statusStart: true,
      statusEnd: false,
    });
    await fetchMeetingById();
  };

  const handleStopMeeting = async () => {
    confirm({
      title: 'Do you want to end emotion recognition for this meeting?',
      content: (
        <span>
          Warning : You <strong>cannot</strong> re-enable emotion recognition
          again!
        </span>
      ),
      okText: 'End',
      okType: 'danger',
      okButtonProps: { type: 'primary' },
      cancelButtonProps: { type: 'text' },
      onOk: async () => {
        await setMeetingStatus({
          emoviewCode,
          statusStart: true,
          statusEnd: true,
        });
        handleStopRecognition();
        localStorage.removeItem(`class/${meetCode}/${emoviewCode}/started`);
        fetchMeetingById();
      },
    });

    setIsLoadingEnd(false);
  };

  const handleStartRecognition = async () => {
    await startRecognition(emoviewCode);
    handleOnMount();
  };

  const handleStopRecognition = async () => {
    await stopRecognition(emoviewCode);
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
        await removeMeeting({ emoviewCode });
        const data = await getClassDetailByMeetCode({ meetCode });
        const countOfMeetings = data[0].countOfMeetings;
        await updateMeetingCount({
          meetCode,
          initialCountOfMeetings: countOfMeetings,
        });
        navigate(`/class/${meetCode}`);
      },
    });
  };

  const handleSwitch = (checked) => {
    if (checked) {
      handleStartRecognition();
      localStorage.setItem(`class/${meetCode}/${emoviewCode}/started`, checked);
    } else {
      handleStopRecognition();
      localStorage.removeItem(`class/${meetCode}/${emoviewCode}/started`);
    }
  };

  const getSwitchStatus = () => {
    const status = localStorage.getItem(
      `class/${meetCode}/${emoviewCode}/started`
    );
    if (status === null) {
      setRecognitionStatus(false);
    } else {
      setRecognitionStatus(true);
    }
  };

  const fetchRecognitionOverview = async (emoviewCode, limit) => {
    try {
      const data = await getRecognition(emoviewCode, limit);
      setRecognitionsDetail(data.recognitionsDetail);
      setRecognitionsOverview(data.recognitionsOverview);
      setRecognitionsSummary(data.recognitionsSummary);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeetingParticipants = async (emoviewCode) => {
    try {
      const data = await getMeetingParticipants({ emoviewCode });
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
        <PageLayout backToPrevious prevLink={`class/${meetCode}`}>
          <Header
            name={meetingData.name}
            subject={meetingData.subject}
            description={meetingData.description}
            link={meetingData.link}
            emoviewCode={meetingData.emoviewCode}
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
            startMeetingRef={startMeetingRef}
            meetingCodeRef={meetingCodeRef}
            recognitionSwitchRef={recognitionSwitchRef}
            refreshRef={refreshRef}
            floatingDisplayRef={floatingDisplayRef}
            endRecognitionRef={endRecognitionRef}
            dropdownRef={dropdownRef}
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
                      currentMenu={`class/${meetCode}`}
                      pageId={emoviewCode}
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
          {meetingData.isStart && (
            <MeetingDetailsTour
              meetingCodeRef={meetingCodeRef}
              recognitionSwitchRef={recognitionSwitchRef}
              refreshRef={refreshRef}
              floatingDisplayRef={floatingDisplayRef}
              endRecognitionRef={endRecognitionRef}
              dropdownRef={dropdownRef}
            />
          )}
          {!meetingData.isStart && (
            <PreStartMeetingTour
              startMeetingRef={startMeetingRef}
              dropdownRef={dropdownRef}
              name={meetingData.name}
            />
          )}
        </PageLayout>
      )}
      {isLoading && <PageLoading />}
    </>
  );
};

export default MeetingDetails;
