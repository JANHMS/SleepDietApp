// @ts-nocheck
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DataFrame from 'dataframe-js';

const DayChart = (props) => {

  // Sorted the columns needed
  const getxy = (data) => {
    const df = new DataFrame(data, Object.keys(data[0]));
    const sortedDF = df.select('End', 'Time_asleep_seconds').sortBy('End');
    // sortedDF.show()
    return sortedDF.toDict();
  };

  const [barData, setBarData] = useState({
      labels: getxy(props.data)['End'],
      datasets: [
        {
          label: props.name,
          data: getxy(props.data)['Time_asleep_seconds'],
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
        return hour_minutes;
    };

    return (
        <div>
          <Bar data={barData}
               options={
                 {
                     scales: {
                         xAxes: [
                           {
                             display: true,
                             offset: true,
                             type: 'time',
                             time: {
                               parser: false,
                               tooltipFormat: 'll',
                               unit: 'day',
                               unitStepSize: 1,
                               displayFormats: {
                                 day: 'MMM DD'   // DD/MM
                               }
                             }
                           }
                         ],
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
                         text: 'Sleeping time by day',
                         fontSize: 20
                     }
                 }
               } />
        </div>
    )
}

export default DayChart;
