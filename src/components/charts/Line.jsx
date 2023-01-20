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
  TimeScale,
  TimeSeriesScale,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Linechart = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Neutral',
        data: data,
        parsing: {
          xAxisKey: '_id',
          yAxisKey: 'neutral',
        },
        backgroundColor: 'transparent',
        borderColor: '#00B8D4',
        borderWidth: 1,
        tension: 0.2,
      },
      {
        label: 'Happy',
        data: data,
        parsing: {
          xAxisKey: '_id',
          yAxisKey: 'happy',
        },
        backgroundColor: 'transparent',
        borderColor: '#64DD17',
        borderWidth: 1,
        tension: 0.2,
      },
      {
        label: 'Sad',
        data: data,
        parsing: {
          xAxisKey: '_id',
          yAxisKey: 'sad',
        },
        backgroundColor: 'transparent',
        borderColor: '#2962FF',
        borderWidth: 1,
        tension: 0.2,
      },
      {
        label: 'Angry',
        data: data,
        parsing: {
          xAxisKey: '_id',
          yAxisKey: 'angry',
        },
        backgroundColor: 'transparent',
        borderColor: '#D50000',
        borderWidth: 1,
        tension: 0.2,
      },
      {
        label: 'Fearful',
        data: data,
        parsing: {
          xAxisKey: '_id',
          yAxisKey: 'fearful',
        },
        backgroundColor: 'transparent',
        borderColor: '#AA00FF',
        borderWidth: 1,
        tension: 0.2,
      },
      {
        label: 'Disgusted',
        data: data,
        parsing: {
          xAxisKey: '_id',
          yAxisKey: 'disgusted',
        },
        backgroundColor: 'transparent',
        borderColor: '#212121',
        borderWidth: 1,
        tension: 0.2,
      },
      {
        label: 'Surprised',
        data: data,
        parsing: {
          xAxisKey: '_id',
          yAxisKey: 'surprised',
        },
        backgroundColor: 'transparent',
        borderColor: '#FF6D00',
        borderWidth: 1,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
        adapters: {
          date: {
            zone: 'Asia/Jakarta',
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Timestamp',
          font: {
            size: 13,
          },
        },
      },
    },
  };

  return (
    <Card title="Details">
      {data.length === 0 ? (
        <Empty />
      ) : (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Line data={chartData} options={options} />
        </div>
      )}
    </Card>
  );
};

export default Linechart;
