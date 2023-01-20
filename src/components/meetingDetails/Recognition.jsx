import { Card, Col, Empty, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import DoughnutChart from '../charts/Doughnut';
import LineChart from '../charts/Line';
import PieChart from '../charts/Pie';

const Recognition = ({ recogStream, recogOverview, recogSummary }) => {
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    setSummaryData(recogSummary);
    console.log('hello');
  }, [recogSummary]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row>
        <Col span={24}>
          <LineChart data={recogStream} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <PieChart data={recogOverview} />
        </Col>
        <Col span={12}>
          {summaryData ? (
            <DoughnutChart data={summaryData} />
          ) : (
            <Card title="Summary">
              <Empty />
            </Card>
          )}
        </Col>
      </Row>
    </Space>
  );
};

export default Recognition;
