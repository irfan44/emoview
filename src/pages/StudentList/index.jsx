import { Table } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getMeetingById } from '../../api/meeting';
import { getUserStudentAtMeeting } from '../../api/user';
import Subtitle from '../../components/common/typography/Subtitle';
import Title from '../../components/common/typography/Title';
import PageLayout from '../../components/layout/PageLayout';

const StudentList = () => {
  const [meetingData, setMeetingData] = useState();
  const [studentAtMeeting, setStudentAtMeeting] = useState();
  const { id } = useParams();

  const fetchMeetingById = async () => {
    try {
      const data = await getMeetingById(id);
      setMeetingData(data);
      studentsAtMeeting(data.code);
    } catch (error) {
      console.log(error);
    }
  };

  const studentsAtMeeting = async (meetingCode) => {
    try {
      const data = await getUserStudentAtMeeting(meetingCode);
      setStudentAtMeeting(data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (_, tags) => (
        <>
          <Link to={`/students/${tags._id}`}>View Emotion {'>'}</Link>
        </>
      ),
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
  ];

  useEffect(() => {
    fetchMeetingById();
  }, []);

  return (
    <>
      {meetingData && (
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
            <div className="text-black/[.60] px-1">{meetingData.name}</div>
          </div>
          <div className="mb-6">
            <div>
              <Title>{meetingData.name}</Title>
              <Subtitle>{meetingData.subject}</Subtitle>
            </div>
          </div>
          <Table dataSource={studentAtMeeting} columns={columns} />
        </PageLayout>
      )}
    </>
  );
};

export default StudentList;
