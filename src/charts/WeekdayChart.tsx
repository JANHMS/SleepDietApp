// @ts-nocheck
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const WeekdayChart = (props) => {
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

    const formatTime = (secs, longerFormat) => {
        var hour_minutes = ""
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        if(longerFormat) {
          hour_minutes = hours + "h y " + minutes + "min"
        } else{
          if(hours == 0){
            hour_minutes = 0
          } else{
            hour_minutes =  hours + ":" + minutes
          }
        }
        return hour_minutes + "h";
    };

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
                                   callback: function(data, index, datasets) {
                                     return formatTime(data, false);
                                    }
                               }
                             }
                         ]
                     },
                     tooltips: {
               			  callbacks: {
               					label: function(tooltipItem, data) {
               						var value = data.datasets[0].data[tooltipItem.index];
               						value = formatTime(value, true)
               						return value;
               					}
               			  }
               			 },
                     title: {
                         display: true,
                         text: 'Average sleep by weekday',
                         fontSize: 20
                     }
                 }
               } />
        </div>
    )
}

export default WeekdayChart;
