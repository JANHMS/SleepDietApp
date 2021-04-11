// @ts-nocheck
import React, { useEffect, useState } from 'react';
import WeekdayChart from "../charts/WeekdayChart";
import MonthChart from "../charts/MonthChart";
import * as d3 from 'd3';
import DataFrame from 'dataframe-js';
import { IonButton } from '@ionic/react'
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';

// To change the csv path so as to get it from firebase/json
function CreateSleepBarCharts() {
    // To store the orirignal data for the graphs
    const [data, setData] = React.useState([]);

    // To store all the grouped dataframes in a dict
    const [dict_data, setDictData] = React.useState([]);

    // To store the data to show in the graph selected by the user
    const [small_data, setSmallData] = React.useState();
    const [small_labels, setSmallLabels] = React.useState();

    // To control which graph to show
    const [weekday_chart, setWeekdayChart] = React.useState(true);
    const [month_chart, setMonthChart] = React.useState(false);

    // To control the graphs are shown when reloading the page
    const [loading, setLoading] = React.useState(true);

    // X-axis for the different graphs. FYI: Monday=0, Sunday=6; January=1, December=12
    const x_labels = ['Weekdays', 'Months']
    const labels = { Weekdays: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'] ,
                     Months: ['January', 'February', 'March', 'April']}

    // Function to reestructure the original data
    const reestructure = (d,arra) => {
      let splitted = d.Start.split('');
      splitted.splice(10, 0, 'T');
      splitted.splice(20, 0, 'Z');
      splitted = splitted.join('')
      return arra.push( { Time_asleep_seconds: d.Time_asleep_seconds, Weekday: d.Weekday, Month: d.Month, Start: splitted.toString().replace(/\s/g, '') } );  //
    };

    // Function to get the average sleep over the column_to_groupby variable
    const getMeanData = (data_all, column_to_groupby, column_to_mean) => {
      const df = new DataFrame(data_all, Object.keys(data_all[0]));
      const groupedDF = df.groupBy(column_to_groupby).aggregate(group => group.stat.mean(column_to_mean)).rename('aggregation', 'mean').sortBy(column_to_groupby);
      groupedDF.show()
      return groupedDF.toDict();
    };

    // Load the data
    useEffect(() => {
      d3.csv("./sleep_cleaned.csv").then((original_data) => {
        var reestructured_data = []
        var aux_dict = {}
        original_data.map( d => reestructure(d, reestructured_data))
        setData(reestructured_data);
        aux_dict[x_labels[0]] = getMeanData(reestructured_data, 'Weekday', 'Time_asleep_seconds');
        aux_dict[x_labels[1]] = getMeanData(reestructured_data, 'Month', 'Time_asleep_seconds');
        setDictData(aux_dict)
        setSmallData(aux_dict[x_labels[0]])
        setSmallLabels(labels[x_labels[0]])
        setLoading(false);
        console.log("SLEEP_CLEANED LOADED AND GROUPED DATA FOR THE SLEEP GRAPHS CREATED")
      })
      .catch(error => console.error(error));;
      return () => undefined;
    }, []);

    const buttonClickSetGraph = (name) => {
      setSmallData(dict_data[name])
      setSmallLabels(labels[name])
      if(name == x_labels[1]) {
        setWeekdayChart(false)
        setMonthChart(true)
      } else {
        setWeekdayChart(true)
        setMonthChart(false)
      }
    }

    return (
      <div>
        <header>
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
            </IonRow>
          </IonGrid>
          {loading && <div>loading</div>}
          {!loading && weekday_chart && <WeekdayChart labels={small_labels} data={small_data} name="Sleep average" />}
          {!loading && month_chart && <MonthChart labels={small_labels} data={small_data} name="Sleep average" />}
        </header>
      </div>
    );
}

export default CreateSleepBarCharts;
