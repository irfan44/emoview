import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getUserStudent } from '../../api/user';
import Subtitle from '../../components/common/typography/Subtitle';
import Title from '../../components/common/typography/Title';
import PageLayout from '../../components/layout/PageLayout';
import LoadingMeetingList from '../../components/loading/MeetingList';
import StudentsList from '../../components/students/StudentsList';

const Students = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    setIsLoading(true);
    const data = await getUserStudent();
    setStudents(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <PageLayout>
      <p className="text-black/[.60] mb-2">Students</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px',
          marginBottom: '24px',
        }}
      >
        <div>
          <Title>Students</Title>
          <Subtitle>List of all your students</Subtitle>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => fetchStudents()}>Refresh</Button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingMeetingList />
      ) : (
        <StudentsList students={students} />
      )}
    </PageLayout>
  );
};

export default Students;
