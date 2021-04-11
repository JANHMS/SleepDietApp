// @ts-nocheck
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const MonthChart = (props) => {
  // set data
  const [barData, setBarData] = useState({
      labels: props.labels,
      datasets: [
        {
          label: props.name,
          data: props.data.mean,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 0.6)',
          borderWidth: 1,
        },
      ],
    });
  // set options
  const [barOptions, setBarOptions] = useState({
      options: {
          scales: {
              yAxes: [
                  {
                      ticks: {
                          beginAtZero: true
                      }
                  }
              ]
          },
          title: {
              display: true,
              text: 'Month Bar Chart',
              fontSize: 25
          }
      }
  });

    return (
        <div>
          <Bar data={barData} options={barOptions} />
        </div>
    )
}

export default MonthChart;
