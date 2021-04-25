import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import DataFrame from 'dataframe-js';

const RadarChart = (props) => {

    // Function to get the average data over the column_to_groupby variable
    const getMeanCol = (data_all, column_to_groupby, column_to_mean, nameMeanCol) => {
        const df = new DataFrame(data_all, Object.keys(data_all[0]));
        const groupedDF = df.groupBy(column_to_groupby).aggregate(group => group.stat.mean(column_to_mean)).rename('aggregation', nameMeanCol).sortBy(column_to_groupby);
        return groupedDF.filter(row => !(row.get("Weekday") === null)).toDict();
      };             

    const getWeekdayMeanData = (data, groupbyColumn) => {
        var sleep_mean = getMeanCol(data, groupbyColumn, 'Sleep_quality', 'QualityMean')
        var amount_mean = getMeanCol(data, groupbyColumn, 'Amount', 'AmountMean')
        var wellness_mean = getMeanCol(data, groupbyColumn, 'Wellness' ,'WellnessMean')
        var fatness_mean = getMeanCol(data, groupbyColumn, 'Fatness' ,'FatnessMean')

        var result = []
        const id_weekday = Object.keys(sleep_mean[groupbyColumn])
        id_weekday.forEach(function(weekday){
            var dayData = []
            // dayData.push(weekday)
            dayData.push(sleep_mean['QualityMean'][weekday]/10)
            dayData.push(amount_mean['AmountMean'][weekday]/10)
            dayData.push(wellness_mean['WellnessMean'][weekday]/10)
            dayData.push(fatness_mean['FatnessMean'][weekday]/10)
            result.push( dayData );
        });
        return result;
    };         

    // Inital state is empty, required for the component, if not an an error is launched
    const [barData, setBarData] = useState(                
        {
            labels: [
                'Sleep',
                'Amount',
                'Wellness',
                'Fatness'
            ],
            datasets: [
                {
                    label: 'Mon.',
                    data: []
                }, {
                    label: 'Tue.',
                    data: []
                },
                {
                    label: 'Wed.',
                    data: []
                },
                {
                    label: 'Thu.',
                    data: []
                },
                {
                    label: 'Fri.',
                    data: []
                },
                {
                    label: 'Sat.',
                    data: []
                },
                {
                    label: 'Sun.',
                    data: []
                }
            ]
        }
    );

    // Set data
    useEffect(() => {
        if (!props.loading) { 
            var dataToShow = getWeekdayMeanData(props.data, 'Weekday');
            setBarData(
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
                        data: dataToShow[0],
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
                        data: dataToShow[1],
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
                        data: dataToShow[2],
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
                        data: dataToShow[3],
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
                        data: dataToShow[4],
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
                        data: dataToShow[5],
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
                        data: dataToShow[6],
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
            )             
        } else {
            console.log("no data")
        }
    }, []);            

    return (
        <div>
          <Radar 
            data={barData}
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
