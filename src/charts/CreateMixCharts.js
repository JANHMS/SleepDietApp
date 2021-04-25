// @ts-nocheck
import React, { useEffect, useState } from 'react';
import RadarChart from "../charts/RadarChart";
import { IonGrid, IonRow, IonTitle } from '@ionic/react';
import { IonButton } from '@ionic/react';
import * as moment from "moment";
import PieChart from "../charts/PieChart";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import DataFrame from 'dataframe-js';

// To change the csv path so as to get it from firebase/json
const CreateFoodCharts = (props) => {
    
    //const [testValue, setTestValue] = useState(0);

    // To store count data
    const [joinedData, setJoinedData] = useState([]);

    const [showRadar, setShowRadarChart] = React.useState(true);
    const [showPie, setShowPieChart] = React.useState(true);

    // const x_labels = ['Weekdays']

    // Control button colors
    const [colorWeekdayButton, setColorWeekdayButton] = React.useState("primary");    

    // State the loading variable for the graph, necessary to show the first graph
    const [loading, setLoading] = useState(true);        

    const reestructure_sleep = (d,arra) => {
        return arra.push( { Time_asleep_seconds: d.Time_asleep_seconds,
                            End: moment(d.End).format('YYYY-MM-DD'),
                            Sleep_quality: d.Sleep_quality.slice(0, d.Sleep_quality.indexOf('%')),
                            Weekday: d.Weekday } );
    };

    const reestructure_food = (d,arra) => {
        return arra.push( { Category: d.Category,
                            Date: moment(d.Date).format('YYYY-MM-DD'),
                            Hungry_Overate: d.Hungry_Overate * 100/10,
                            NonFatty_Fatty: d.NonFatty_Fatty * 100/10,
                            Unwell_Well: d.Unwell_Well * 100/10 });
    };      

    const join = (lookupTable, mainTable, lookupKey, mainKey, select) => {
        var l = lookupTable.length,
            m = mainTable.length,
            lookupIndex = [],
            output = [];
        for (var i = 0; i < l; i++) { // loop through l items
            var row = lookupTable[i];
            lookupIndex[row[lookupKey]] = row; // create an index for lookup table
        }
        for (var j = 0; j < m; j++) { // loop through m items
            var y = mainTable[j];
            var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
            output.push(select(y, x)); // select only the columns you need
        }
        return output;
    };    

    // const buttonClickSetGraph = (name) => {
    //   if(name == x_labels[0]) {
    //     setShowRadarChart(true)
    //     setColorWeekdayButton("primary")
    //   }
    // }      

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

    const getValues = (dictionary ) => { 
        var count = []
        var keys = Object.keys(dictionary);
        keys.forEach(function(key){
            count.push(dictionary[key]);
        });
        var total = count.reduce((a, b) => a + b, 0)
        return count.map(x => x * 100/total);
    }    

    
    const [weekdayCountData, setWeekdayCountData] = useState([]);
    const [oneDayIndex, setOneDayIndex] = useState([]);
    const [oneDayData, setOneDayData] = useState([0,0,0,0,0,0,0,0]);
    const [labelsPie, setLabelsPie] = useState();
    

    const selectChanged = (e) => {
        setOneDayIndex(e.detail.value)
        setOneDayData(weekdayCountData[e.detail.value])
      }  

    useEffect(() => {
        if(!props.loading_sleep && !props.loading_food) {
            const restr_sleep = []
            const restr_food = []
            props.sleepData.map( d => reestructure_sleep(d, restr_sleep))
            props.foodData.map( d => reestructure_food(d, restr_food))
            var result = join(restr_sleep, restr_food, "End", "Date", function(food, sleep) {
                return {
                    Sleep_quality: (sleep !== undefined) ? sleep.Sleep_quality : null,
                    Time_asleep: (sleep !== undefined) ? sleep.Time_asleep_seconds : null,
                    Weekday: (sleep !== undefined) ? sleep.Weekday : null,
                    Category: food.Category,
                    Date_only: food.Date,
                    Amount: food.Hungry_Overate,
                    Fatness: food.NonFatty_Fatty,
                    Wellness: food.Unwell_Well
                };
            });
            setJoinedData(result)   
            const count = getCountByWeekday(result, 'Weekday');
            setWeekdayCountData(count)
            setOneDayIndex([])
            setOneDayData([])
            setLabelsPie(Object.keys(count[0]))
            setLoading(false)        
        } else {
            console.log("no data to join")
        }
    }, []);

    return (
      <div>
        {loading && <div>Drawing graph...</div>}
        <IonTitle size="small"
                    style={{
                    textAlign: 'center',
                    marginTop: '10px',
                    marginBottom: '20px',
                    color: "#92949c"
        }}>
            Sleep quality and dinner details by weekday
        </IonTitle>
        {!loading && showRadar && <RadarChart data={joinedData} name="Radar Graph" loading={loading}/>}
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
            <IonSelect value={oneDayIndex} placeholder="Select One" onIonChange={selectChanged}>
                <IonSelectOption value="0">Monday</IonSelectOption>
                <IonSelectOption value="1">Tuesday</IonSelectOption>
                <IonSelectOption value="2">Wednesday</IonSelectOption>
                <IonSelectOption value="3">Thursday</IonSelectOption>
                <IonSelectOption value="4">Friday</IonSelectOption>
                <IonSelectOption value="5">Saturday</IonSelectOption>
                <IonSelectOption value="6">Sunday</IonSelectOption>
            </IonSelect>   
        </IonItem>              
        {!loading && showPie && <PieChart labels={labelsPie} data={getValues(oneDayData)} index={oneDayIndex} name="Pie Graph" loading={loading} />}
      </div>
    );
}

export default CreateFoodCharts;
