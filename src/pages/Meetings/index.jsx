import { Button, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getMeeting } from '../../api/meeting';
import PageLayout from '../../components/layout/PageLayout';
import LoadingMeetingList from '../../components/loading/MeetingList';
import AddMeeting from '../../components/meeting/AddMeeting';
import MeetingList from '../../components/meeting/MeetingList';

const { Title } = Typography;

const Meetings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meetings, setMeetings] = useState([]);

  const fetchMeetings = async () => {
    setIsLoading(true);
    const data = await getMeeting();
    setMeetings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <PageLayout>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px',
          marginBottom: '16px',
        }}
      >
        <Title level={3} style={{ marginBottom: 0 }}>
          Meetings
        </Title>
        <div>
          <Space>
            <AddMeeting fetchData={fetchMeetings} />
            <Button onClick={() => fetchClasses()}>Refresh</Button>
          </Space>
        </div>
      </div>
      {isLoading ? <LoadingMeetingList /> : <MeetingList meetings={meetings} />}
    </PageLayout>
  );
};

export default Meetings;
