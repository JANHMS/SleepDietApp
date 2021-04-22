import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const CategoriesCountChart = (props) => {
    console.log(props)

    const getLabels = (labels) => { 
        var reLabels = [];
        labels.forEach(function(key){
            var separated = []
            var words = key.split(" ")
            for (var i = 0; i < words.length; i++) {
                separated.push( words[i] )
            }
            reLabels.push( separated );
        });
        // console.log(reLabels)
        return reLabels;
    }

    const getValues = (dictionary ) => { 
        var count = []
        var keys = Object.keys(dictionary);
        keys.forEach(function(key){
            count.push(dictionary[key]);
        });
        var total = count.reduce((a, b) => a + b, 0)
        return count.map(x => x * 100/total);
    }

    const [barData, setBarData] = useState({
        labels: getLabels(props.labels),
        datasets: [
            {
            label: props.name,
            data: getValues(props.data),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 0.6)',
            borderWidth: 1,
            },
        ],
        });

    // set data
    useEffect(() => {
        if (props.data) {
            setBarData(
                {
                    labels: getLabels(props.labels),
                    datasets: [
                        {
                        label: props.name,
                        data: getValues(props.data),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 0.6)',
                        borderWidth: 1,
                        },
                    ],
                }                
            )             
        } else {
            console.log("no foodData")
        }
    }, []);            

    return (
        <div>
          <Bar data={barData}
               options={
                 {
                     scales: {
                         yAxes: [
                             {
                               ticks: {
                                   beginAtZero: true,
                                   maxTicksLimit: 5,
                                   callback: function(data, index, datasets) {
                                    return data + "%";
                                   }
                               }
                             }
                         ]
                     },
                     tooltips: {
                        callbacks: {
                            title: function(tooltipItems, data) {
                                return Object.keys(props.data)[tooltipItems[0].index];
                            },                            
                            label: function(tooltipItem, data) {
                                var value = data.datasets[0].data[tooltipItem.index];
                                return value.toFixed(2) + "%";
                            }
                        }
                    },
                     title: {
                         display: false,
                         text: 'Type of food eaten',
                         fontSize: 20
                     },
                     plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: 'rgb(255, 99, 132)'
                            }
                        }
                    }
                 }
               } />
        </div>
    )
}

export default CategoriesCountChart;
