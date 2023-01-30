import { Card, Empty } from 'antd';
import { useEffect, useState } from 'react';
import {
  DOUGHNUT_CHART_SUBTITLE,
  DOUGHNUT_CHART_TITLE,
  LINE_CHART_SUBTITLE,
  LINE_CHART_TITLE,
  RADAR_CHART_SUBTITLE,
  RADAR_CHART_TITLE,
} from '../../data/constants';
import DoughnutChart from '../charts/Doughnut';
import LineChart from '../charts/Line';
import RadarChart from '../charts/Radar';
import Subtitle from '../common/typography/Subtitle';

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
            <Card bodyStyle={{ padding: '16px 24px' }}>
              <div className="mb-2">
                <h5 className="font-semibold text-lg mb-0">
                  {LINE_CHART_TITLE}
                </h5>
                <Subtitle>{LINE_CHART_SUBTITLE}</Subtitle>
              </div>
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
