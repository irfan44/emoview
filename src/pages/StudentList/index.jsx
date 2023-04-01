import { Table } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getMeetingByEmoviewCode, getMeetingById } from '../../api/meeting.js';
import { getUserSameMeeting, getUserStudentAtMeeting } from '../../api/user.js';
import Subtitle from '../../components/common/typography/Subtitle.jsx';
import Title from '../../components/common/typography/Title.jsx';
import PageLayout from '../../components/layout/PageLayout.jsx';
import { getClassDetailByMeetCode } from '../../api/class.js';

const StudentList = () => {
  const [meetingData, setMeetingData] = useState();
  const [studentAtMeeting, setStudentAtMeeting] = useState();
  const { emoviewCode } = useParams();

  const fetchMeetingById = async () => {
    try {
      const data = await getMeetingByEmoviewCode({ emoviewCode });
      setMeetingData(data[0]);
      studentsAtMeeting(emoviewCode);
    } catch (error) {
      console.log(error);
    }
  };

  const studentsAtMeeting = async (emoviewCode) => {
    try {
      const data = await getUserSameMeeting({ emoviewCode });
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
          <Link to={`/students/${tags._id}/${emoviewCode}`}>
            View Emotion {'>'}
          </Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchMeetingById();
  }, []);

  return (
    <>
      {meetingData && (
        <PageLayout backToPrevious>
          <div className="mb-6">
            <div>
              <Title>{meetingData.name}</Title>
              <Subtitle>{meetingData.subject}</Subtitle>
            </div>
          </div>
          <Table
            rowKey="_id"
            dataSource={studentAtMeeting}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
          />
        </PageLayout>
      )}
    </>
  );
};

export default StudentList;
