import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {

    const getValues = (dictionary ) => { 
        var count = []
        if (dictionary !== undefined && dictionary !== null){
            var keys = Object.keys(dictionary);
            keys.forEach(function(key){
                count.push(dictionary[key]);
            });
            var total = count.reduce((a, b) => a + b, 0)
            return count.map(x => x * 100/total);
        }
        else{
            return count
        }
    } 
    
    return (
        <div>
          <Pie data={
                {
                labels: props.labels,
                datasets: [{
                    label: 'Food categories',
                    data: getValues(props.data[props.index]),
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
