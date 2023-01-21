import { Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import EmptyHolder from '../placeholders/EmptyHolder';

const { Text, Title } = Typography;

const ParticipantList = ({ id, meetingParticipants }) => {
  return (
    <>
      {meetingParticipants ? (
        <Row gutter={[8, 8]}>
          {meetingParticipants.map((data) => {
            return (
              <Col span={6} key={data.userId}>
                <Link to={`/meeting/${id}/${data.userId}`}>
                  <Card hoverable style={{ cursor: 'pointer' }}>
                    <Title level={5}>{data.fullname}</Title>
                    <Text type="secondary">{data.email}</Text>
                  </Card>
                </Link>
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
