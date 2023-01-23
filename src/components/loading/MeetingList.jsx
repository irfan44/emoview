import { Card } from 'antd';
import { Col, Row } from 'antd';

const LoadingMeetingList = () => {
  return (
    <Row className="mt-6" gutter={[16, 16]}>
      <Col span={8}>
        <Card loading />
      </Col>
      <Col span={8}>
        <Card loading />
      </Col>
      <Col span={8}>
        <Card loading />
      </Col>
    </Row>
  );
};

export default LoadingMeetingList;
