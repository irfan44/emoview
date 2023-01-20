import { Card, Col, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import EmptyHolder from '../placeholders/EmptyHolder';

const { Text, Title } = Typography;

const ParticipantList = ({ meetingParticipants }) => {
  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate('/meeting-details/user');
    sessionStorage.setItem('meeting-details:userId', userId);
  };

  return (
    <>
      {meetingParticipants ? (
        <Row gutter={[8, 8]}>
          {meetingParticipants.map((data) => {
            return (
              <Col span={6} key={data.userId}>
                <Card
                  hoverable
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClick(data.userId)}
                >
                  <Title level={5}>{data.fullname}</Title>
                  <Text type="secondary">{data.userId}</Text>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <EmptyHolder title="No participants joined" />
      )}
    </>
  );
};

export default ParticipantList;
