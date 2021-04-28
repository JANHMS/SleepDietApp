// @ts-nocheck
import React, { useEffect, useState } from 'react';
import RadarChart from "./RadarChart";
import { IonTitle } from '@ionic/react';
import PieChart from "./PieChart";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import DataFrame from 'dataframe-js';

// To change the csv path so as to get it from firebase/json
const CreateFoodCharts = (props) => {

    const [showRadar, setShowRadarChart] = React.useState(true);
    const [showPie, setShowPieChart] = React.useState(true);

    // State the loading variable for the graph, necessary to show the first graph
    const [loading, setLoading] = useState(true);        

    // For Radar Chart
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

    // For pie chart
    // Function to group by the key string
    const groupByKeyword = (data_all, column_to_groupby) => {
        const df = new DataFrame(data_all, Object.keys(data_all[0]));
        const groupedDF = df.select('Weekday','Category').groupBy(column_to_groupby); // .sortBy(column_to_groupby);
        // groupedDF.show()
        return groupedDF.filter(row => !(row.get("Weekday") === null)).toDict();
      };             

    const getCountFromArray = (data) => {
        var categoryCount = {
            "Caffeinated drinks": 0,
            "Dairy": 0,
            "Fruits": 0,
            "Grains": 0,
            "Protein food": 0,
            "Snacks": 0,
            "Soft drinks": 0,
            "Vegetables": 0,
        }
        var categoryLabels = Object.keys( categoryCount )
        data.map( item => {
            for (var i = 0; i < categoryLabels.length; i++) {
                var category = categoryLabels[i]
                if( item.includes(category) ){
                    categoryCount[category] = categoryCount[category] + 1
                }
            }
        } );
        return categoryCount;
    };     
      
    // Function to get the count of categories from a specific dataframe
    const getCountByWeekday = (data_all, column_to_groupby) => {
        const categoriesByWeekday = groupByKeyword(data_all, column_to_groupby)
        var categories = {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": []
        }
        for (var i = 0; i < categoriesByWeekday[column_to_groupby].length; i++) {
            var weekday = categoriesByWeekday[column_to_groupby][i]
            categories[weekday].push(categoriesByWeekday['Category'][i])
        }
        var countByWeekday = {
            "0": {},
            "1": {},
            "2": {},
            "3": {},
            "4": {},
            "5": {},
            "6": {}
        }
        var keys = Object.keys(countByWeekday);
        keys.forEach(function(key){
            countByWeekday[key] = getCountFromArray(categories[key]);
        });     
        return countByWeekday;
    };            
    
    const [index, setIndex] = useState([]);
    const labelsPie = ["Caffeinated drinks", "Dairy", "Fruits", "Grains", "Protein food", "Snacks", "Soft drinks", "Vegetables"] 

    return (
      <div>
        <IonTitle size="small"
                    style={{
                    textAlign: 'center',
                    marginTop: '10px',
                    marginBottom: '20px',
                    color: "#92949c"
        }}>
            Sleep quality and dinner details by weekday
        </IonTitle>
        {showRadar && <RadarChart data={getWeekdayMeanData(props.joinedData, 'Weekday')} name="Radar Graph" />}
        <IonTitle size="small"
                    style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    color: "#92949c"
        }}>
           Food categories consumed
        </IonTitle>   
        <IonItem>
            <IonLabel>Choose a weekday</IonLabel>
            <IonSelect value={index} placeholder="Select One" onIonChange={e => setIndex(e.detail.value)}>
                <IonSelectOption value="0">Monday</IonSelectOption>
                <IonSelectOption value="1">Tuesday</IonSelectOption>
                <IonSelectOption value="2">Wednesday</IonSelectOption>
                <IonSelectOption value="3">Thursday</IonSelectOption>
                <IonSelectOption value="4">Friday</IonSelectOption>
                <IonSelectOption value="5">Saturday</IonSelectOption>
                <IonSelectOption value="6">Sunday</IonSelectOption>
            </IonSelect>   
        </IonItem>              
        {showPie && <PieChart labels={labelsPie} data={getCountByWeekday(props.joinedData, 'Weekday')} index={index} name="Pie Graph" />}
      </div>
    );
}

export default CreateFoodCharts;
