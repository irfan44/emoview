import { Col, Row } from 'antd';
import EmptyHolder from '../placeholders/EmptyHolder';
import ParticipantCard from './ParticipantCard';

const ParticipantList = ({ id, meetingParticipants }) => {
  return (
    <>
      {meetingParticipants ? (
        <Row gutter={[8, 8]}>
          {meetingParticipants.map((data) => {
            return (
              <Col span={6} key={data.userId}>
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
