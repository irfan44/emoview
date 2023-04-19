import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getUserByUserId,
  getUserOverview,
  getUserSummary,
} from '../../api/user.js';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import Title from '../../components/common/typography/Title.jsx';
import PageLayout from '../../components/layout/PageLayout.jsx';
import Recognition from '../../components/studentDetails/Recognition.jsx';
import { getRecognitionById } from '../../api/recognition.js';
import PageLoading from '../../components/loading/PageLoading.jsx';

const StudentDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState();
  const [studentOverview, setStudentOverview] = useState();
  const [studentSummary, setStudentSummary] = useState();

  const { userId, emoviewCode } = useParams();

  const fetchStudentDetails = async () => {
    try {
      setIsLoading(true);
      const data = await getUserByUserId(userId);
      setStudentData(data[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentOverview = async () => {
    try {
      setIsLoading(true);
      const data = await getUserOverview(userId);
      setStudentOverview(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentSummary = async () => {
    try {
      setIsLoading(true);
      const data = await getUserSummary(userId);
      setStudentSummary(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecognitionOverview = async (emoviewCode, limit) => {
    try {
      setIsLoading(true);
      const data = await getRecognitionById(emoviewCode, userId, limit);
      setStudentOverview(data.recognitionsOverview);
      setStudentSummary(data.recognitionsSummary);
      setIsLoading(false);
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
      {isLoading && <PageLoading />}
    </>
  );
};

export default StudentDetails;
