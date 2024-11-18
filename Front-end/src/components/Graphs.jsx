// Graphs.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Graphs = ({ labels, scores }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Scores',
        data: scores,
        backgroundColor: [
          '#FF5733',
          '#33FF57',
          '#3357FF',
          '#FF33A6',
          '#F3FF33',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Scores by Activity',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Score',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Activity',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Graphs;
