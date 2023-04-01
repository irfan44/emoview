import { Table, Tabs } from 'antd';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getMeeting } from '../../api/meeting';
import { getUserStudent } from '../../api/user';
import Subtitle from '../../components/common/typography/Subtitle';
import Title from '../../components/common/typography/Title';
import PageLayout from '../../components/layout/PageLayout';
import LoadingMeetingList from '../../components/loading/MeetingList';
import MeetingList from '../../components/meeting/MeetingList';
import StudentsList from '../../components/students/StudentsList';
import { getClassList } from '../../api/class.js';
import ClassList from '../../components/class/ClassList.jsx';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/table.css';

const Students = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [classList, setClassList] = useState([]);

  const navigate = useNavigate();

  const fetchStudents = async () => {
    setIsLoading(true);
    const data = await getUserStudent();
    setStudents(data);
    setIsLoading(false);
  };

  const fetchMeetings = async () => {
    setIsLoading(true);
    const data = await getMeeting();
    setMeetings(data);
    setIsLoading(false);
  };

  const fetchClasses = async () => {
    setIsLoading(true);
    const data = await getClassList();
    setClassList(data);
    setIsLoading(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Started At',
      dataIndex: 'startedAt',
      key: 'startedAt',
      render: (data) => <span>{new Date(data).toLocaleString()}</span>,
    },
  ];

  const items = [
    {
      key: '1',
      label: `By Class`,
      children: (
        <>
          {isLoading ? (
            <LoadingMeetingList />
          ) : (
            <ClassList classList={classList} currentMenu={'students/class'} />
          )}
        </>
      ),
    },
//    {
//      key: '2',
//      label: 'By Meetings',
//      children: (
//        <>
//          {isLoading ? (
//            <LoadingMeetingList />
//          ) : (
//            // <MeetingList meetings={meetings} page={'students/meeting'} />
//            <Table
//              onRow={(record, rowIndex) => {
//                return {
//                  onClick: (event) => {
//                    navigate(
//                      `/students/meeting/${record.meetCode}/${record.emoviewCode}`
//                    );
//                  },
//                };
//              }}
//              pagination={{ hideOnSinglePage: true }}
//              dataSource={meetings}
//              columns={columns}
//            />
//          )}
//        </>
//      ),
//    },
    {
      key: '2',
      label: `All Students`,
      children: (
        <>
          {isLoading ? (
            <LoadingMeetingList />
          ) : (
            <StudentsList students={students} currentMenu={'students'} />
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchStudents();
    fetchMeetings();
    fetchClasses();
  }, []);

  return (
    <PageLayout currentMenu={'Students'}>
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
      <Tabs defaultActiveKey="1" items={items} />
    </PageLayout>
  );
};

export default Students;
