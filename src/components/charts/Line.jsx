import { Card, Switch, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import Subtitle from '../common/typography/Subtitle';
import { LINE_CHART_SUBTITLE, LINE_CHART_TITLE } from '../../data/constants';
import ExportModal from '../meeting/ExportModal';
import CustomLegend from './CustomLegend';
import Style from '../../styles/lineChart.module.css';

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
  const [legendArray, setLegendArray] = useState();
  const [chartElement, setChartElement] = useState();

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  const veryLargeData = data.labels.length > 3000;
  const largeData = data.labels.length > 2000 && data.labels.length < 3000;
  const mediumData = data.labels.length > 100 && data.labels.length < 2000;

  const simpleData = (data) => {
    return data.slice(-15);
  };

  const createAxis = (labels, data) => {
    return labels.map((value, index) => ({ x: value, y: data[index] }));
  };

  const chartData = {
    datasets: [
      {
        id: 1,
        label: 'Neutral',
        data: !isSimple
          ? createAxis(data.labels, data.neutral)
          : createAxis(simpleData(data.labels), simpleData(data.neutral)),
        backgroundColor: 'transparent',
        borderColor: '#00B8D4',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        id: 2,
        label: 'Happy',
        data: !isSimple
          ? createAxis(data.labels, data.happy)
          : createAxis(simpleData(data.labels), simpleData(data.happy)),
        backgroundColor: 'transparent',
        borderColor: '#64DD17',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        id: 3,
        label: 'Sad',
        data: !isSimple
          ? createAxis(data.labels, data.sad)
          : createAxis(simpleData(data.labels), simpleData(data.sad)),
        backgroundColor: 'transparent',
        borderColor: '#001AFF',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        id: 4,
        label: 'Angry',
        data: !isSimple
          ? createAxis(data.labels, data.angry)
          : createAxis(simpleData(data.labels), simpleData(data.angry)),
        backgroundColor: 'transparent',
        borderColor: '#FF0000',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        id: 5,
        label: 'Fearful',
        data: !isSimple
          ? createAxis(data.labels, data.fearful)
          : createAxis(simpleData(data.labels), simpleData(data.fearful)),
        backgroundColor: 'transparent',
        borderColor: '#bf00ff',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        id: 6,
        label: 'Disgusted',
        data: !isSimple
          ? createAxis(data.labels, data.disgusted)
          : createAxis(simpleData(data.labels), simpleData(data.disgusted)),
        backgroundColor: 'transparent',
        borderColor: '#212121',
        borderWidth: 1,
        tension: 0.3,
      },
      {
        id: 7,
        label: 'Surprised',
        data: !isSimple
          ? createAxis(data.labels, data.surprised)
          : createAxis(simpleData(data.labels), simpleData(data.surprised)),
        backgroundColor: 'transparent',
        borderColor: '#FFB700',
        borderWidth: 1,
        tension: 0.3,
      },
    ],
  };

  const options = {
    normalized: true,
    animation: {
      duration: 0,
    },
    hover: {
      animationDuration: 0,
    },
    responsiveAnimationDuration: 0,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
          mode: 'x',
          threshold: 5,
          rangeMax: {
            x: null,
          },
        },
        zoom: {
          wheel: {
            enabled: !isSimple && !largeData && !mediumData,
          },
          pinch: {
            enabled: !isSimple && !largeData && !mediumData,
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
    setsSimple(checked);
  };

  const setWidth = () => {
    return isSimple
      ? '100%'
      : largeData || mediumData
      ? `${data.labels.length * 20}px`
      : veryLargeData
      ? '30000px'
      : '100%';
  };

  useEffect(() => {
    const chart = ChartJS.getChart(chartRef.current);
    setChartElement(chart);
    const legend = chart.options.plugins.legend.labels.generateLabels(chart);
    let legendArr = [];
    legend.forEach((item) => {
      const index = item.datasetIndex;
      const isHidden = item.hidden;
      const strokeStyle = item.strokeStyle;
      const text = item.text;
      legendArr.push({ index, isHidden, strokeStyle, text });
    });
    setLegendArray(legendArr);
  }, []);

  return (
    <Card bodyStyle={{ padding: '16px 24px' }}>
      <div className="flex justify-between mb-2">
        <div>
          <h5 className="font-semibold text-lg mb-0">{LINE_CHART_TITLE}</h5>
          <Subtitle>{LINE_CHART_SUBTITLE}</Subtitle>
        </div>
        <div className="flex items-center space-x-2">
          <ExportModal data={data} />
          <div className="flex items-center space-x-1">
            <Subtitle>Last 15 data</Subtitle>
            <Tooltip title="Only show the last 15 data" placement="topRight">
              <Switch size="small" onChange={handleSimpleMode} />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="text-center my-4">
        {withImage && <img className="mb-4 w-36" src={currentImage()} />}
        <div className="flex justify-center space-x-4 mb-4">
          {legendArray &&
            legendArray.map((item) => {
              return (
                <CustomLegend
                  key={item.index}
                  item={item}
                  chartElement={chartElement}
                />
              );
            })}
        </div>
        <div className={Style.lineChart} style={{ overflowX: 'auto' }}>
          <div
            ref={chartContainerRef}
            style={{
              position: 'relative',
              width: setWidth(),
            }}
          >
            <Line
              ref={chartRef}
              data={chartData}
              options={options}
              height={400}
            />
          </div>
        </div>
      </div>
      <div>
        <span className="text-black/[.60] text-xs block">
          {!isSimple
            ? !largeData && !mediumData
              ? '* Emotion captured at 5 second interval'
              : '* Emotion data displayed may be incomplete due to its large size. Please export to view the complete emotion dataset'
            : '* Only the last 15 emotion data is displayed'}
        </span>
        {!isSimple && (largeData || mediumData) && (
          <span className="text-black/[.60] text-xs block">
            * Zooming feature has been disabled to maintain optimal performance.
            We apologize for any inconvenience caused
          </span>
        )}
      </div>
    </Card>
  );
};

export default Linechart;
