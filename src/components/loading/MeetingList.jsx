import { Card } from 'antd';
import { Col, Row } from 'antd';

const LoadingMeetingList = () => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
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
