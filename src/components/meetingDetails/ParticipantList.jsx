import { Avatar, Space } from 'antd';
import { Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import EmptyHolder from '../placeholders/EmptyHolder';
import ParticipantCard from './ParticipantCard';

const { Paragraph, Text, Title } = Typography;

const ParticipantList = ({ id, meetingParticipants }) => {
  return (
    <>
      {meetingParticipants ? (
        <Row gutter={[8, 8]}>
          {meetingParticipants.map((data) => {
            return (
              <Col span={6} key={data.userId}>
                {/* <Link to={`/meeting/${id}/${data.userId}`}>
                  <Card
                    hoverable
                    style={{ cursor: 'pointer', width: '100%', height: '100%' }}
                    bodyStyle={{ padding: '20px 16px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '12px' }}>
                        <img
                          src={data.picture}
                          alt={data.userId}
                          style={{ borderRadius: '50%' }}
                          height="36"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div style={{ width: '80%' }}>
                        <Title level={5} ellipsis style={{ marginBottom: 0 }}>
                          {data.fullname}
                        </Title>
                        <Text type="secondary">{data.email}</Text>
                      </div>
                    </div>
                  </Card>
                </Link> */}
                <ParticipantCard id={id} data={data} />
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
