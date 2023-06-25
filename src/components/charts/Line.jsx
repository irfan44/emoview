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

  const largeData = data.labels.length > 2000;
  const mediumData = data.labels.length > 100 && data.labels.length < 2000;

  const simpleData = (data) => {
    return data.slice(-15);
  };

  const minimizeLargeData = (data) => {
    return data.filter((_, index, arr) => {
      const isDivisibleByTen = index % 10 === 0;
      const isFirstIndex = index === 0;
      const isLastIndex = index === arr.length - 1;
      return isDivisibleByTen && !isFirstIndex && !isLastIndex;
    });
  };

  const minimizeMediumData = (data) => {
    return data.filter((_, index, arr) => {
      const isDivisibleByTen = index % 5 === 0;
      const isFirstIndex = index === 0;
      const isLastIndex = index === arr.length - 1;
      return isDivisibleByTen && !isFirstIndex && !isLastIndex;
    });
  };

  const createAxis = (labels, data) => {
    if (largeData && !isSimple) {
      const processedLabels = minimizeLargeData(labels);
      const processedData = minimizeLargeData(data);
      return processedLabels.map((value, index) => ({
        x: value,
        y: processedData[index],
      }));
    }
    if (mediumData && !isSimple) {
      const processedLabels = minimizeMediumData(labels);
      const processedData = minimizeMediumData(data);
      return processedLabels.map((value, index) => ({
        x: value,
        y: processedData[index],
      }));
    }
    return labels.map((value, index) => ({ x: value, y: data[index] }));
  };

  const chartData = {
    datasets: [
      {
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
    parsed: false,
    animate: false,
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
      : mediumData
      ? '9999px'
      : largeData
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
