import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = (props) => {               
    return (
        <div>
          <Radar 
            data={
                {
                    labels: [
                        'Sleep',
                        'Amount',
                        'Wellness',
                        'Fatness'
                      ],
                    datasets: [{
                        label: 'Mon.',
                        hidden: false,
                        data: props.data[0],
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                      }, {
                        label: 'Tue.',
                        hidden: false,
                        data: props.data[1],
                        fill: true,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(54, 162, 235)'
                      },
                      {
                        label: 'Wed.',
                        hidden: true,
                        data: props.data[2],
                        fill: true,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgb(255, 159, 64)',
                        pointBackgroundColor: 'rgb(255, 159, 64)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 159, 64)'
                      },
                      {
                        label: 'Thu.',
                        hidden: true,
                        data: props.data[3],
                        fill: true,
                        backgroundColor: 'rgba(255, 205, 86, 0.2)',
                        borderColor: 'rgb(255, 205, 86)',
                        pointBackgroundColor: 'rgb(255, 205, 86)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 205, 86)'
                      },
                      {
                        label: 'Fri.',
                        hidden: true,
                        data: props.data[4],
                        fill: true,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)',
                        pointBackgroundColor: 'rgb(75, 192, 192)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(75, 192, 192)'
                      },
                      {
                        label: 'Sat.',
                        hidden: true,
                        data: props.data[5],
                        fill: true,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgb(153, 102, 255)',
                        pointBackgroundColor: 'rgb(153, 102, 255)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(153, 102, 255)'
                      },
                      {
                        label: 'Sun.',
                        hidden: true,
                        data: props.data[6],
                        fill: true,
                        backgroundColor: 'rgba(255, 153, 255, 0.2)',
                        borderColor: 'rgb(255, 153, 255)',
                        pointBackgroundColor: 'rgb(255, 153, 255)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 153, 255)'
                      }
                    ]
                }                
            }
            options={
                 {
                    title: {
                        display: false,
                        text: 'Sleep quality and dinner details',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: "left",
                        align: 'start',
                        labels: {
                            boxWidth: 10,
                            padding: 10
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },
                    tooltips: {
                        enabled: true,
                        callbacks: {
                            title: function(tooltipItems, data) {
                                return data[tooltipItems[0].value];
                              },                             
                        }
               	     }                                      
                 }
               } />
        </div>
    )
}

export default RadarChart;
