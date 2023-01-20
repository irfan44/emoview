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
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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
    <Card title="Summary" style={{ width: '100%' }}>
      {Object.keys(data).length === 0 ? (
        <Empty />
      ) : (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Doughnut data={chartData} options={options} />
        </div>
      )}
    </Card>
  );
};

export default DoughnutChart;
