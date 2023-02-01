import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getMeetingById } from '../../api/meeting';
import { getRecognitionById } from '../../api/recognition';
import { getUserByUserId } from '../../api/user';
import Subtitle from '../../components/common/typography/Subtitle';
import Title from '../../components/common/typography/Title';
import PageLayout from '../../components/layout/PageLayout';
import Recognition from '../../components/meetingDetails/Recognition';

const UserEmotionDetails = () => {
  const [recognitionsDetail, setRecognitionsDetail] = useState();
  const [recognitionsOverview, setRecognitionsOverview] = useState({});
  const [recognitionsSummary, setRecognitionsSummary] = useState();
  const [userData, setUserData] = useState();

  const { meetingId, userId } = useParams();

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BE_ENDPOINT;
  const socket = io(baseURL, { transports: ['websocket'], upgrade: false });

  const fetchRecognitionById = async () => {
    try {
      const data = await getMeetingById(meetingId);
      fetchRecognitionOverview(data.code, userId, ' ');

      socket.on('connect', () => {
        socket.emit('join', `${data.code}-${userId}`);
      });

      if (data.isStart) {
        socket.on('RECOGNITION_DATA_ADDED', () => {
          fetchRecognitionOverview(data.code, userId, ' ');
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
      console.log(data[0]);
      setUserData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecognitionOverview = async (id, userId, limit) => {
    try {
      const data = await getRecognitionById(id, userId, limit);
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
    <PageLayout>
      <div className="flex space-x-1 mb-2">
        <div>
          <Link
            className="flex items-center text-black/[.60] px-1 rounded-md -ml-1 hover:text-black hover:bg-black/[.06]"
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <FaAngleLeft /> Back to Previous
          </Link>
        </div>
      </div>
      {userData && (
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
