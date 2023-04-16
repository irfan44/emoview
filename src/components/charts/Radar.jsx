import { Card, Empty } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { RADAR_CHART_SUBTITLE, RADAR_CHART_TITLE } from '../../data/constants';
import Subtitle from '../common/typography/Subtitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const RadarChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.datas,
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        borderColor: 'rgba(25, 118, 210, 1)',
        pointBackgroundColor: 'rgba(25, 118, 210, 1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(25, 118, 210, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 12,
          },
        },
        ticks: {
          display: false,
          stepSize: 25,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label({ formattedValue }) {
            return `${formattedValue}%`;
          },
        },
        displayColors: false,
      },
    },
  };

  return (
    <Card bodyStyle={{ padding: '16px 24px' }}>
      <div className="mb-2">
        <h5 className="font-semibold text-lg mb-0">{RADAR_CHART_TITLE}</h5>
        <Subtitle>{RADAR_CHART_SUBTITLE}</Subtitle>
      </div>
      {Object.keys(data).length === 0 ? (
        <Empty />
      ) : (
        <div className="text-center">
          <div className="my-4">
            <Radar
              data={chartData}
              options={options}
              height={400}
              width={400}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default RadarChart;
