// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DataFrame from 'dataframe-js';
import * as moment from "moment";

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
                         xAxes: [
                           {
                             display: true,
                             offset: true,
                             ticks: {
                             beginAtZero: true,
                             callback: function(data, index, datasets) {
                                return moment(data).format('MMM DD');
                              }
                             },
                             afterFit: function(scale) {
                              scale.height = 40 
                            }                             
                           }
                         ],
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
                        title: function(tooltipItems, data) {
                          return moment(tooltipItems[0].label).format('YYYY-MM-DD');
                        },                          
               					label: function(tooltipItem, data) {
               						var value = data.datasets[0].data[tooltipItem.index];
               						value = formatTime(value, true)
               						return value;
               					}
               			  }
               			 },
                     title: {
                         display: false,
                         text: 'Sleeping time by day',
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

export default DayChart;
