import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


interface PieChartProps {
  maleCount: number;
  femaleCount: number;
}
const PieChart = ({ maleCount, femaleCount }: PieChartProps) => {
  const piechart = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Product Count",
        data: [maleCount, femaleCount],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const options: any = {
    plugins: {
      title: {
        display: true,
        text: "Gender Distribution",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return tooltipItem.label + ": " + tooltipItem.raw;
          },
        },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return <Pie data={piechart} options={options} />;
};

export default PieChart;
