import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  animation: false,
  onHover: function (e, item) {
    // add hover here!!!
  },
  responsive: true,
  interaction: {
    intersect: false,
    mode: "index",
  },
  tooltip: {
    position: "nearest",
  },
  plugins: {
    title: {
      align: "end",
      display: false,
      text: "Distanz, m / Höhe, m",
    },
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      position: "nearest",

      callbacks: {
        title: (tooltipItems) => {
          return "Entfernung: " + tooltipItems[0].label + "m";
        },
        label: (tooltipItem) => {
          return "Höhe: " + tooltipItem.raw + "m";
        },
      },
    },
  },
  scales: {
    x: {
      type: "linear",
    },
    y: {
      type: "linear",
      beginAtZero: true,
    },
  },
};

export default function ElevationChart({ elevationData }) {
  const stations = [];
  const elevations = [];
  for (const station of Object.keys(elevationData)) {
    stations.push(station);
    elevations.push(elevationData[station]);
  }

  const labels = stations;

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        pointRadius: 0,
        label: "Dataset 2",
        data: elevations,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
