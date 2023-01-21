import { Button, Card, Col, Row, Space, Typography, theme } from 'antd';
import { useEffect, useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { countMeeting, getMeeting } from '../../api/meeting';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import MeetingList from '../../components/meeting/MeetingList';

const { Text, Title } = Typography;

const Dashboard = () => {
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
      const data = await getMeeting();
      const recentMeeting = data.slice(0, 6);
      setMeetings(recentMeeting);
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
      <Title level={3} style={{ marginBottom: '0px' }}>
        Dashboard
      </Title>
      {user && <Text type="secondary">Welcome, {user.name}</Text>}
      <Row style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Col>
          <Card>
            <Title>{count}</Title>
            <Text type="secondary">Total Meeting</Text>
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
        <Title level={4} style={{ marginBottom: 0 }}>
          Recent Meetings
        </Title>
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
      <MeetingList meetings={meetings} />
    </PageLayout>
  );
};

export default Dashboard;
