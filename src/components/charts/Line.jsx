import { Card, Switch, Tooltip } from 'antd';
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import Subtitle from '../common/typography/Subtitle';
import { LINE_CHART_SUBTITLE, LINE_CHART_TITLE } from '../../data/constants';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  zoomPlugin,
  Title,
  ChartTooltip,
  Legend
);

const Linechart = ({ data, withImage }) => {
  const [currentIndex, setCurrentIndex] = useState();
  const [isSimple, setsSimple] = useState(false);

  const simpleData = (data) => {
    return data.slice(-15);
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
            setCurrentIndex(context[0].dataIndex);
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
            enabled: !isSimple,
          },
          pinch: {
            enabled: !isSimple,
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

  const currentImage = () => {
    return data.image[currentIndex] || '';
  };

  const handleSimpleMode = (checked) => {
    setCurrentIndex();
    setsSimple(checked);
  };

  return (
    <Card bodyStyle={{ padding: '16px 24px' }}>
      <div className="flex justify-between mb-2">
        <div>
          <h5 className="font-semibold text-lg mb-0">{LINE_CHART_TITLE}</h5>
          <Subtitle>{LINE_CHART_SUBTITLE}</Subtitle>
        </div>
        <div className="flex items-center space-x-2">
          <Subtitle>Simple</Subtitle>
          <Tooltip title="Only show the last 15 data" placement="topRight">
            <Switch size="small" onChange={handleSimpleMode} />
          </Tooltip>
        </div>
      </div>
      <div className="text-center mb-2">
        {withImage && <img className="mb-4 w-36" src={currentImage()} />}
        <Line data={chartData} options={options} />
      </div>
      <div>
        <span className="text-black/[.60] text-xs">
          * Emotion captured at 5 second interval
        </span>
      </div>
    </Card>
  );
};

export default Linechart;
