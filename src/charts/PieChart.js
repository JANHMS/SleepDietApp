import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {

    return (
        <div>
          <Pie data={
                {
                labels: props.labels,
                datasets: [{
                    label: 'Food categories',
                    data: props.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 153, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 153, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    hoverOffset: 4                        
                    }
                ]
            }  
          }
               options={
                 {
                    title: {
                        display: false,
                        text: 'Food categories',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        onClick: null,
                        position: "left",
                        align: 'start',
                        labels: {
                            boxWidth: 10,
                            padding: 5
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 10,
                            bottom: 5
                        }
                    },
                    tooltips: {
                        callbacks: {
                            title: function(tooltipItems, data) {
                                return data['labels'][tooltipItems[0].index];
                            },                            
                            label: function(tooltipItem, data) {
                                var value = data.datasets[0].data[tooltipItem.index];
                                return value.toFixed(0) + "%";
                            }
                        }
                    },                      
                 }
               } />
        </div>
    )
}

export default PieChart;
