import { Card, Col, Empty, Row } from 'antd';
import { useEffect, useState } from 'react';
import DoughnutChart from '../charts/Doughnut';
import LineChart from '../charts/Line';
import RadarChart from '../charts/Radar';

const Recognition = ({ recogDetail, recogOverview, recogSummary }) => {
  const [detailData, setDetailData] = useState();
  const [overviewData, setOverviewData] = useState();
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    setDetailData(recogDetail);
    setSummaryData(recogSummary);
    setOverviewData(recogOverview);
  }, [recogDetail, recogSummary, recogOverview]);

  return (
    <div className="w-full space-y-2">
      <Row>
        <Col span={24}>
          {detailData ? (
            <LineChart data={detailData} />
          ) : (
            <Card>
              <Empty />
            </Card>
          )}
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          {overviewData ? (
            <RadarChart data={overviewData} />
          ) : (
            <Card title="Summary">
              <Empty />
            </Card>
          )}
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
    </div>
  );
};

export default Recognition;
