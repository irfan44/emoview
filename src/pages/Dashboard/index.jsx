import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { countMeeting, getMeeting } from '../../api/meeting';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import SectionTitle from '../../components/common/typography/SectionTitle';
import Subtitle from '../../components/common/typography/Subtitle';
import Title from '../../components/common/typography/Title';
import LoadingMeetingList from '../../components/loading/MeetingList';
import MeetingList from '../../components/meeting/MeetingList';

const { Text } = Typography;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [count, setCount] = useState();
  const [meetings, setMeetings] = useState([]);

  const navigate = useNavigate();

  const fetchCountMeeting = async () => {
    try {
      const data = await countMeeting();
      setCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeetings = async () => {
    try {
      setIsLoading(true);
      const data = await getMeeting();
      const recentMeeting = data.slice(0, 6);
      setMeetings(recentMeeting);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    setUser(await window.electronAPI.getProfile());
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    fetchCountMeeting();
    fetchMeetings();
  }, []);

  return (
    <PageLayout>
      <Title>Dashboard</Title>
      {user && <Subtitle>Welcome, {user.name}</Subtitle>}
      <Row style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Col span={4}>
          <Card loading={isLoading}>
            <h5 className="font-bold text-4xl">{count}</h5>
            <Subtitle>Total Meeting</Subtitle>
          </Card>
        </Col>
      </Row>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px',
          marginBottom: '16px',
        }}
      >
        <SectionTitle level={4} style={{ marginBottom: 0 }}>
          Recent Meetings
        </SectionTitle>
        <div>
          <Button
            type="text"
            onClick={() => navigate('/meetings')}
            style={{ padding: 0 }}
          >
            <Space size={'small'}>
              <Text type="secondary">View All</Text>
              <Text type="secondary">
                <FaChevronRight style={{ marginTop: '6px' }} />
              </Text>
            </Space>
          </Button>
        </div>
      </div>
      {isLoading ? <LoadingMeetingList /> : <MeetingList meetings={meetings} />}
    </PageLayout>
  );
};

export default Dashboard;
