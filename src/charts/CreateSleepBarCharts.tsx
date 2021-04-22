// @ts-nocheck
import React, { useEffect, useState } from 'react';
import WeekdayChart from "../charts/WeekdayChart";
import MonthChart from "../charts/MonthChart";
import DayChart from "../charts/DayChart";
import * as d3 from 'd3';
import DataFrame from 'dataframe-js';
import { IonButton } from '@ionic/react';
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';
import {IonItem} from '@ionic/react';

const CreateSleepBarCharts = (props) => {

    console.log(props)
    // To store data reestructured for the graphs
    const [data, setData] = React.useState([]);

    // To store all the grouped dataframes in a dict
    const [dict_data, setDictData] = React.useState([]);

    // To store the data to show in the graph selected by the user
    const [small_data, setSmallData] = React.useState([]);
    const [small_labels, setSmallLabels] = React.useState([]);

    // To control which graph to show
    const [weekday_chart, setWeekdayChart] = React.useState(false);
    const [month_chart, setMonthChart] = React.useState(false);
    const [day_chart, setDayChart] = React.useState(false);

    // X-axis for the different graphs. FYI: Monday=0, Sunday=6; January=1, December=12
    const x_labels = ['Weekdays', 'Months', 'Day']
    const labels = { Weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] ,
                     Months: ['January', 'February', 'March', 'April']}

    // Function to reestructure the original data if needed
    const reestructure = (d,arra) => {
      return arra.push( { Time_asleep_seconds: d.Time_asleep_seconds,
                          End: d.End,
                          Weekday: d.Weekday,
                          Month: d.Month } );  //Start: splitted.toString().replace(/\s/g, '')
    };

    // Function to get the average sleep over the column_to_groupby variable
    const getMeanData = (data_all, column_to_groupby, column_to_mean) => {
      const df = new DataFrame(data_all, Object.keys(data_all[0]));
      const groupedDF = df.select(column_to_groupby, column_to_mean).groupBy(column_to_groupby).aggregate(group => group.stat.mean(column_to_mean)).rename('aggregation', 'mean').sortBy(column_to_groupby);
      // groupedDF.show()
      return groupedDF.toDict();
    };

    useEffect(() => {
          if(!props.loading_sleep) {
            var aux_dict = {}
            var reestructured_data = []
            props.sleepData.map( d => reestructure(d, reestructured_data))
            setData(reestructured_data);
              if (reestructured_data != undefined || reestructured_data != null){
              aux_dict[x_labels[0]] = getMeanData(reestructured_data, 'Weekday', 'Time_asleep_seconds');
              aux_dict[x_labels[1]] = getMeanData(reestructured_data, 'Month', 'Time_asleep_seconds');

              setDictData(aux_dict)
              setSmallData(aux_dict[x_labels[0]])
              setSmallLabels(labels[x_labels[0]])
            }

          } else console.log("no sleepData")
      },[])

    const buttonClickSetGraph = (name) => {
      setSmallData(dict_data[name])
      setSmallLabels(labels[name])
      if(name == x_labels[0]) {
        setWeekdayChart(true)
        setMonthChart(false)
        setDayChart(false)
      }
      if(name == x_labels[1]) {
        setWeekdayChart(false)
        setMonthChart(true)
        setDayChart(false)
      }
      if(name == x_labels[2]) {
        setWeekdayChart(false)
        setMonthChart(false)
        setDayChart(true)
      }
    }

    return (
      <div>
          <IonGrid>
            <IonRow>
              <IonButton
                color="primary"
                onClick={ () => buttonClickSetGraph(x_labels[0])}
                size="small"
                shape="round" fill="outline"
              >
                { x_labels[0] }
              </IonButton>
              <IonButton
                color="primary"
                onClick={ () => buttonClickSetGraph(x_labels[1])}
                size="small"
                shape="round" fill="outline"
              >
                { x_labels[1] }
              </IonButton>
              <IonButton
                color="primary"
                onClick={ () => buttonClickSetGraph(x_labels[2])}
                size="small"
                shape="round" fill="outline"
              >
                { x_labels[2] }
              </IonButton>
            </IonRow>
          </IonGrid>
          <IonItem>
            {props.loading_sleep && <div>loading</div>}
            {!props.loading_sleep && weekday_chart && <WeekdayChart labels={small_labels} data={small_data} name="Sleep average"/>}
            {!props.loading_sleep && month_chart && <MonthChart labels={small_labels} data={small_data} name="Sleep average"/>}
            {!props.loading_sleep && day_chart && <DayChart data={data} name="Time asleep"/>}
          </IonItem>
      </div>
    );
}

export default CreateSleepBarCharts;
