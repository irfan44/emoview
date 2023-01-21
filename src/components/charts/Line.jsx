import { Card, Space, Switch, Typography } from 'antd';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { Text } = Typography;

const Linechart = ({ data }) => {
  const [isSimple, setsSimple] = useState(false);

  const simpleData = (data) => {
    return data.slice(-10);
  };

  const chartData = {
    labels: !isSimple ? data.labels : simpleData(data.labels),
    datasets: [
      {
        label: 'Neutral',
        data: !isSimple ? data.neutral : simpleData(data.neutral),
        backgroundColor: 'transparent',
        borderColor: '#00B8D4',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: 'Happy',
        data: !isSimple ? data.happy : simpleData(data.happy),
        backgroundColor: 'transparent',
        borderColor: '#64DD17',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: 'Sad',
        data: !isSimple ? data.sad : simpleData(data.sad),
        backgroundColor: 'transparent',
        borderColor: '#2962FF',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: 'Angry',
        data: !isSimple ? data.angry : simpleData(data.angry),
        backgroundColor: 'transparent',
        borderColor: '#D50000',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: 'Fearful',
        data: !isSimple ? data.fearful : simpleData(data.fearful),
        backgroundColor: 'transparent',
        borderColor: '#AA00FF',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: 'Disgusted',
        data: !isSimple ? data.disgusted : simpleData(data.disgusted),
        backgroundColor: 'transparent',
        borderColor: '#212121',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: 'Surprised',
        data: !isSimple ? data.surprised : simpleData(data.surprised),
        backgroundColor: 'transparent',
        borderColor: '#FF6D00',
        borderWidth: 1,
        tension: 0.3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
      },
      tooltip: {
        itemSort(a, b) {
          return b.raw - a.raw;
        },
        callbacks: {
          title: (context) => {
            return new Date(context[0].label).toLocaleString('en-GB');
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          threshold: 5,
          rangeMax: {
            x: null,
          },
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          callback: function (value) {
            return `${new Date(this.getLabelForValue(value)).toLocaleTimeString(
              'en-GB'
            )}`;
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
      y: {
        ticks: {
          stepSize: 0.1,
        },
        title: {
          display: true,
          text: 'Probability',
          font: {
            size: 13,
          },
        },
      },
    },
  };

  const handleSimpleMode = (checked) => {
    setsSimple(checked);
  };

  return (
    <Card
      title="Details"
      extra={
        <Space align="center">
          <Text type="secondary">Simple : </Text>
          <Switch size="small" onChange={handleSimpleMode} />
        </Space>
      }
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default Linechart;
