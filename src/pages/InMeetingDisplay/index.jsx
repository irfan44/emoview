import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getRecognition } from '../../api/floating';
import { getMeetingParticipants } from '../../api/meeting';
import PositiveNegative from '../../components/floatingDisplay/PositiveNegative';
import ShowAll from '../../components/floatingDisplay/ShowAll';
import DominantEmotion from '../../components/inMeetingDisplay/DominantEmotion';
import ParticipantCount from '../../components/inMeetingDisplay/ParticipantCount';
import InMeetingLayout from '../../components/layout/InMeetingLayout';

const InMeetingDisplay = () => {
  const [recognitionStream, setRecognitionStream] = useState({});
  const [recognitionsSummary, setRecognitionsSummary] = useState();
  const [maxRecognition, setMaxRecognition] = useState();
  const [countParticipants, setCountParticipants] = useState();
  const [layout, setLayout] = useState('positive/negative');

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const accessToken = searchParams.get('accessToken');

  const baseURL = import.meta.env.VITE_BE_ENDPOINT;
  const socket = io(baseURL, { transports: ['websocket'], upgrade: false });

  const fetchRecognition = async () => {
    try {
      fetchRecognitionOverview(id, 1);
      fetchMeetingParticipants(id);

      socket.on('connect', () => {
        socket.emit('join', id);
      });

      socket.on('USER_JOINED', () => {
        fetchMeetingParticipants(id);
      });

      socket.on('RECOGNITION_DATA_ADDED', () => {
        fetchRecognitionOverview(id, 1);
        console.log('FER:: Recognition Running');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecognitionOverview = async (id, limit) => {
    try {
      const data = await getRecognition(id, limit, accessToken);
      let arr = data.recognitionStream[0];
      let max = Object.keys(arr).reduce((a, b) => (arr[a] > arr[b] ? a : b));
      setMaxRecognition(max);
      setRecognitionStream(data.recognitionStream[0]);
      setRecognitionsSummary(data.recognitionsSummary);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeetingParticipants = async (id) => {
    try {
      const data = await getMeetingParticipants({ emoviewCode: id });
      let count = data.length;
      setCountParticipants(count);
    } catch (error) {
      console.log(error);
    }
  };

  const changeLayout = () => {
    layout === 'all' ? setLayout('positive/negative') : setLayout('all');
  };

  useEffect(() => {
    fetchRecognition();

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return (
    <InMeetingLayout changeLayout={changeLayout}>
      <div className="min-w-full space-y-4">
        {layout === 'all' ? (
          <ShowAll recognitionStream={recognitionStream} />
        ) : (
          <PositiveNegative
            recognitionStream={recognitionStream}
            recognitionsSummary={recognitionsSummary}
          />
        )}
        <div className="flex items-center justify-between">
          <DominantEmotion emotion={maxRecognition} />
          <ParticipantCount countParticipants={countParticipants} />
        </div>
      </div>
    </InMeetingLayout>
  );
};

export default InMeetingDisplay;
