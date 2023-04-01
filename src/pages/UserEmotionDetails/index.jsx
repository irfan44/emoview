import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getMeetingByEmoviewCode, getMeetingById } from '../../api/meeting.js';
import { getRecognitionById } from '../../api/recognition.js';
import { getUserByUserId } from '../../api/user.js';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import Title from '../../components/common/typography/Title.jsx';
import PageLayout from '../../components/layout/PageLayout.jsx';
import Recognition from '../../components/meetingDetails/Recognition.jsx';

const UserEmotionDetails = () => {
  const [recognitionsDetail, setRecognitionsDetail] = useState();
  const [recognitionsOverview, setRecognitionsOverview] = useState({});
  const [recognitionsSummary, setRecognitionsSummary] = useState();
  const [userData, setUserData] = useState();

  const { meetCode, emoviewCode, userId } = useParams();

  const baseURL = import.meta.env.VITE_BE_ENDPOINT;
  const socket = io(baseURL, { transports: ['websocket'], upgrade: false });

  const fetchRecognitionById = async () => {
    try {
      const data = await getMeetingByEmoviewCode({ emoviewCode });
      fetchRecognitionOverview(emoviewCode, userId, ' ');

      socket.on('connect', () => {
        socket.emit('join', `${emoviewCode}-${userId}`);
      });

      if (data.isStart) {
        socket.on('RECOGNITION_DATA_ADDED', () => {
          fetchRecognitionOverview(emoviewCode, userId, ' ');
          console.log('FER:: Recognition Running');
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const data = await getUserByUserId(userId);
      setUserData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecognitionOverview = async (emoviewCode, userId, limit) => {
    try {
      const data = await getRecognitionById(emoviewCode, userId, limit);
      setRecognitionsDetail(data.recognitionsDetail);
      setRecognitionsOverview(data.recognitionsOverview);
      setRecognitionsSummary(data.recognitionsSummary);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecognitionById();

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <PageLayout backToPrevious prevLink={`/classes/${meetCode}/${emoviewCode}`}>
      {userData && (
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={userData.picture}
              alt={userData.userId}
              style={{ borderRadius: '50%' }}
              height="42"
              referrerPolicy="no-referrer"
            />
            <div>
              <Title>{userData.fullname}</Title>
              <Subtitle>{userData.email}</Subtitle>
            </div>
          </div>
          <div>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <Recognition
          recogDetail={recognitionsDetail}
          recogOverview={recognitionsOverview}
          recogSummary={recognitionsSummary}
          withImage={true}
        />
      </div>
    </PageLayout>
  );
};

export default UserEmotionDetails;
