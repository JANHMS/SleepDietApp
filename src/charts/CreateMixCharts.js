// @ts-nocheck
import React, { useEffect, useState } from 'react';
import RadarChart from "../charts/RadarChart";
import {IonItem} from '@ionic/react';
import { IonGrid, IonRow } from '@ionic/react';
import { IonButton } from '@ionic/react';
import * as moment from "moment";

// To change the csv path so as to get it from firebase/json
const CreateFoodCharts = (props) => {
    // To store count data
    const [joinedData, setJoinedData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showRadar, setShowRadarChart] = React.useState(false);

    // X-axis for the different graphs. FYI: Monday=0, Sunday=6; January=1, December=12
    const x_labels = ['Weekdays']
    const shortLabels = ["Caff. drink", "Dai.", "Fru.", "Gra.", "Prot. food", "Sna.", "Soft drink", "Veg."]

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
            setLoading(false)        
            
        } else {
            console.log("no data to join")
        }
    }, []);

    const buttonClickSetGraph = (name) => {
      if(name == x_labels[0]) {
        setShowRadarChart(true)
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
            </IonRow>
        </IonGrid>  
        {props.loading_food && <div>loading</div>}
        {!loading && showRadar && <RadarChart labels={['1', '2', '3']} data={joinedData} name="Radar Graph" loading={loading}/>}
      </div>
    );
}

export default CreateFoodCharts;
