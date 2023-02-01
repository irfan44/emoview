import { Card, Empty } from 'antd';
import { useEffect, useState } from 'react';
import {
  DOUGHNUT_CHART_SUBTITLE,
  DOUGHNUT_CHART_TITLE,
  RADAR_CHART_SUBTITLE,
  RADAR_CHART_TITLE,
} from '../../data/constants';
import DoughnutChart from '../charts/Doughnut';
import RadarChart from '../charts/Radar';
import Subtitle from '../common/typography/Subtitle';

const Recognition = ({ studentOverview, studentSummary }) => {
  const [overviewData, setOverviewData] = useState();
  const [summaryData, setSummaryData] = useState();

  useEffect(() => {
    setOverviewData(studentOverview);
    setSummaryData(studentSummary);
  }, [studentOverview, studentSummary]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2">
        <div>
          {overviewData ? (
            <RadarChart data={overviewData} />
          ) : (
            <Card bodyStyle={{ padding: '16px 24px' }}>
              <div className="mb-2">
                <h5 className="font-semibold text-lg mb-0">
                  {RADAR_CHART_TITLE}
                </h5>
                <Subtitle>{RADAR_CHART_SUBTITLE}</Subtitle>
              </div>
              <Empty />
            </Card>
          )}
        </div>
        <div>
          {summaryData ? (
            <DoughnutChart data={summaryData} />
          ) : (
            <Card bodyStyle={{ padding: '16px 24px' }}>
              <div className="mb-2">
                <h5 className="font-semibold text-lg mb-0">
                  {DOUGHNUT_CHART_TITLE}
                </h5>
                <Subtitle>{DOUGHNUT_CHART_SUBTITLE}</Subtitle>
              </div>
              <Empty />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recognition;
