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
import datalabels from 'chartjs-plugin-datalabels';
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
  Legend,
  datalabels
);

ChartJS.defaults.plugins.datalabels.display = false;

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
      datalabels: {
        display: true,
        formatter: (value) => (value ? `${value}%` : ''),
        color: '#fff',
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const emoji = () => {
    if (!data.datas.length) return '';
    else if (data.datas.includes(NaN)) return '😐';
    else if (data.datas[0] > data.datas[1]) return '🙂';
    else return '🙁';
  };

  return (
    <Card bodyStyle={{ padding: '16px 24px' }}>
      <div className="mb-2">
        <h5 className="font-semibold text-lg mb-0">Summary</h5>
        <Subtitle>Overall emotion is positive or negative</Subtitle>
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Doughnut data={chartData} options={options} height="300" width="300" />
        <div
          style={{
            fontSize: '5rem',
            position: 'absolute',
            top: '48%',
            left: '40%',
          }}
        >
          {emoji()}
        </div>
      </div>
    </Card>
  );
};

export default DoughnutChart;
