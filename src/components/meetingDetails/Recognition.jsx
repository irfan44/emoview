import { Card, Empty } from 'antd';
import { useEffect, useState } from 'react';
import DoughnutChart from '../charts/Doughnut';
import LineChart from '../charts/Line';
import RadarChart from '../charts/Radar';

const Recognition = ({
  recogDetail,
  recogOverview,
  recogSummary,
  withImage,
}) => {
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
      <div>
        <div>
          {detailData ? (
            <LineChart data={detailData} withImage={withImage} />
          ) : (
            <Card>
              <Empty />
            </Card>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          {overviewData ? (
            <RadarChart data={overviewData} />
          ) : (
            <Card title="Summary">
              <Empty />
            </Card>
          )}
        </div>
        <div>
          {summaryData ? (
            <DoughnutChart data={summaryData} />
          ) : (
            <Card title="Summary">
              <Empty />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recognition;
