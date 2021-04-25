// @ts-nocheck
import React, { useEffect, useState } from 'react';
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
          if(minutes>=0 && minutes<10 ){
            minutes = '0' + minutes
          }       
          hour_minutes =  hours + ":" + minutes    
          if(hours == 0){
            hour_minutes = 0
          } 
        }
        return hour_minutes;
    };

    // set data
    useEffect(() => {
      if(!props.loading) {
          setBarData(
            {
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
                                   beginAtZero: false,
                                   callback: function(data, index, datasets) {
                                     return formatTime(data, false) + "h";
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
                         display: false,
                         text: 'Average sleep by month',
                         fontSize: 20
                     },
                     legend: {
                      display: true,
                      align: 'end',
                      labels: {
                          boxWidth: 20,
                          padding: 10
                      },
                      onClick: (e) => e.stopPropagation()
                    },  
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    } 
                 }
               } />
        </div>
    )
}

export default MonthChart;
