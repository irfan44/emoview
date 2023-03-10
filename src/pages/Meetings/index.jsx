import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getMeeting } from '../../api/meeting';
import Subtitle from '../../components/common/typography/Subtitle';
import Title from '../../components/common/typography/Title';
import PageLayout from '../../components/layout/PageLayout';
import LoadingMeetingList from '../../components/loading/MeetingList';
import AddMeeting from '../../components/meeting/AddMeeting';
import MeetingList from '../../components/meeting/MeetingList';

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
      <p className="text-black/[.60] mb-2">Meetings</p>
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
          <Title>Meetings</Title>
          <Subtitle>List of all your meetings</Subtitle>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <AddMeeting fetchData={fetchMeetings} />
            <Button onClick={() => fetchClasses()}>Refresh</Button>
          </div>
        </div>
      </div>
      {isLoading ? <LoadingMeetingList /> : <MeetingList meetings={meetings} />}
    </PageLayout>
  );
};

export default Meetings;
