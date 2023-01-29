import { Card } from 'antd';
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
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Subtitle from '../common/typography/Subtitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DoughnutChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Recognition',
        data: data.datas,
        backgroundColor: ['rgba(84, 214, 51, 0.85)', 'rgba(214, 51, 51, 0.85)'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Card bodyStyle={{ padding: '16px 24px' }}>
      <div className="mb-2">
        <h5 className="font-semibold text-lg mb-0">Summary</h5>
        <Subtitle>Overall emotion is positive or negative</Subtitle>
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default DoughnutChart;
