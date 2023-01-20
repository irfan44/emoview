import { Card, Empty } from "antd";
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
} from "chart.js";
import { Radar } from "react-chartjs-2";

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
        label: "Recognition",
        data: data.datas,
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        borderColor: "rgba(25, 118, 210, 1)",
        pointBackgroundColor: "rgba(25, 118, 210, 1)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(25, 118, 210, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <Card title="Overview" style={{ width: "100%" }}>
      {Object.keys(data).length === 0 ? (
        <Empty />
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>
          <Radar data={chartData} options={options} />
        </div>
      )}
    </Card>
  );
};

export default RadarChart;
