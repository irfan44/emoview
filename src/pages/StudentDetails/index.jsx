import { useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  getUserById,
  getUserByUserId,
  getUserOverview,
  getUserSummary,
} from '../../api/user.js';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import Title from '../../components/common/typography/Title.jsx';
import PageLayout from '../../components/layout/PageLayout.jsx';
import Recognition from '../../components/studentDetails/Recognition.jsx';
import { getRecognition } from '../../api/recognition.js';

const StudentDetails = () => {
  const [studentData, setStudentData] = useState();
  const [studentOverview, setStudentOverview] = useState();
  const [studentSummary, setStudentSummary] = useState();

  const { userId, emoviewCode } = useParams();
  const navigate = useNavigate();

  const fetchStudentDetails = async () => {
    try {
      const data = await getUserByUserId(userId);
      setStudentData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentOverview = async () => {
    try {
      const data = await getUserOverview(userId);
      setStudentOverview(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentSummary = async () => {
    try {
      const data = await getUserSummary(userId);
      setStudentSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecognitionOverview = async (emoviewCode, limit) => {
    try {
      const data = await getRecognition(emoviewCode, limit);
      setStudentOverview(data.recognitionsOverview);
      setStudentSummary(data.recognitionsSummary);
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmoviewCode = () => {
    if (emoviewCode) {
      fetchRecognitionOverview(emoviewCode, ' ');
    } else {
      fetchStudentOverview();
      fetchStudentSummary();
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    checkEmoviewCode();
  }, [studentData]);

  return (
    <>
      {studentData && (
        <PageLayout backToPrevious>
          <div className="flex items-center space-x-4">
            <img
              src={studentData.picture}
              alt={studentData.userId}
              style={{ borderRadius: '50%' }}
              height="42"
              referrerPolicy="no-referrer"
            />
            <div>
              <Title>{studentData.fullname}</Title>
              <Subtitle>{studentData.email}</Subtitle>
            </div>
          </div>
          <div className="mt-4">
            <Recognition
              studentOverview={studentOverview}
              studentSummary={studentSummary}
            />
          </div>
        </PageLayout>
      )}
    </>
  );
};

export default StudentDetails;
