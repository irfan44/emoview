import { Button } from 'antd';
import { useEffect, useState } from 'react';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getMeetingById, getRecognition } from '../../api/floating';
import DisplayData from '../../components/inMeetingDisplay/DisplayData';
import DominantEmotion from '../../components/inMeetingDisplay/DominantEmotion';
import ParticipantCount from '../../components/inMeetingDisplay/ParticipantCount';
import InMeetingLayout from '../../components/layout/InMeetingLayout';

const InMeetingDisplay = () => {
  const [recognitionStream, setRecognitionStream] = useState({});
  const [maxRecognition, setMaxRecognition] = useState();
  const [countParticipants, setCountParticipants] = useState();
  const [page, setPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const accessToken = searchParams.get('accessToken');

  const baseURL = import.meta.env.VITE_BE_ENDPOINT;
  const socket = io(baseURL);

  const fetchRecognition = async () => {
    try {
      const data = await getMeetingById(id, accessToken);
      let count = data.participants.length;
      setCountParticipants(count);

      fetchRecognitionOverview(data.code, 1);

      socket.on('connect', () => {
        socket.emit('join', data.code);
      });

      socket.on('RECOGNITION_DATA_ADDED', () => {
        fetchRecognitionOverview(data.code, 1);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecognition();
  }, []);

  return (
    <InMeetingLayout>
      <div className="min-w-full space-y-4">
        <div className="flex items-center justify-between">
          {page !== 0 && (
            <Button
              type="text"
              style={{ padding: 0 }}
              onClick={() => setPage(page - 1)}
            >
              <FaRegArrowAltCircleLeft />
            </Button>
          )}
          {page === 0 && (
            <>
              <DisplayData
                emotionDisplay="dashboard"
                data={recognitionStream.neutral}
                title="Neutral"
              />
              <DisplayData
                emotionDisplay="dashboard"
                data={recognitionStream.happy}
                title="Happy"
              />
              <DisplayData
                emotionDisplay="dashboard"
                data={recognitionStream.sad}
                title="Sad"
              />
            </>
          )}
          {page === 1 && (
            <>
              <div className="flex space-x-2">
                <DisplayData
                  emotionDisplay="dashboard"
                  data={recognitionStream.fearful}
                  title="Fearful"
                />
                <DisplayData
                  emotionDisplay="dashboard"
                  data={recognitionStream.disgusted}
                  title="Disgust"
                />
                <DisplayData
                  emotionDisplay="dashboard"
                  data={recognitionStream.surprised}
                  title="Suprise"
                />
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <div className="flex justify-between">
                <DisplayData
                  emotionDisplay="dashboard"
                  data={recognitionStream.angry}
                  title="Angry"
                />
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <p style={{ color: '#f1f2f6' }}>End</p>
            </>
          )}
          {page !== 2 && (
            <Button
              type="text"
              style={{ padding: 0 }}
              onClick={() => setPage(page + 1)}
            >
              <FaRegArrowAltCircleRight />
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <DominantEmotion emotion={maxRecognition} />
          <ParticipantCount countParticipants={countParticipants} />
        </div>
      </div>
    </InMeetingLayout>
  );
};

export default InMeetingDisplay;
