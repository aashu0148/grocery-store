import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const VerticalBar = (props) => {
  return <Bar options={props?.options} data={props?.data} />;
};

export const PieChart = (props) => {
  return <Pie data={props?.data} />;
};
