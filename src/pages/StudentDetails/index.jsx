import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUserById, getUserOverview, getUserSummary } from '../../api/user';
import Subtitle from '../../components/common/typography/Subtitle';
import Title from '../../components/common/typography/Title';
import PageLayout from '../../components/layout/PageLayout';
import Recognition from '../../components/studentDetails/Recognition';

const StudentDetails = () => {
  const [studentData, setStudentData] = useState();
  const [studentOverview, setStudentOverview] = useState();
  const [studentSummary, setStudentSummary] = useState();

  const { id } = useParams();

  const fetchStudentDetails = async () => {
    try {
      const data = await getUserById(id);
      setStudentData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentOverview = async () => {
    try {
      const data = await getUserOverview(studentData.userId);
      setStudentOverview(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentSummary = async () => {
    try {
      const data = await getUserSummary(studentData.userId);
      setStudentSummary(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    fetchStudentOverview();
    fetchStudentSummary();
  }, [studentData]);

  return (
    <>
      {studentData && (
        <PageLayout>
          <div className="flex space-x-0.5 mb-2">
            <div>
              <Link
                className="text-black/[.60] px-1 rounded-md h-[22px] -ml-1 hover:text-black hover:bg-black/[.06]"
                to="/students"
              >
                Students
              </Link>
            </div>
            <div>
              <span className="text-black/[.60] ">/</span>
            </div>
            <div className="text-black/[.60] px-1">{studentData.fullname}</div>
          </div>
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
