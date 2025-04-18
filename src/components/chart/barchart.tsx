"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface BarChartProps {
  labels: string[];
  datas: number[];
}

const BarChart = ({ labels, datas }: BarChartProps) => {
  const data = {
    labels : labels,
    datasets: [
      {
        label: "# of Votes",
        data: datas,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" ,
      },
      title: {
        display: true,
        text: "Products by Category",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;