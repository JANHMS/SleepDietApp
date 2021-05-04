// @ts-nocheck
import './AnalyticsContainer.css';
import CreateSleepBarCharts from "../charts/CreateSleepBarCharts";
import CreateFoodCharts from "../charts/CreateFoodCharts";
import {IonItemDivider} from "@ionic/react";
import CreateMixCharts from "../charts/CreateMixCharts";
import React, { useEffect, useState } from 'react';
import { firestore } from "../firebase";
import * as moment from "moment";

interface ContainerProps {
    name: string;
}

const AnalyticsContainer: React.FC<ContainerProps> = ({ name }) => {
    // We fetch the data here to no do it inside each family type of graphs
    // userId to get the data in firebase
    const userId = "1"    

    // To store sleep and food data from the user in the database
    const [allSleepData, setAllSleepData] = useState([]); 
    const [allFoodData, setAllFoodData] = useState([]); 
    const [joinedData, setJoinedData] = useState([]);

    // To control the graphs are shown when reloading the page
    const [loading_sleep, setSleepLoading] = useState(true);
    const [loading_food, setFoodLoading] = useState(true);
    const [loading_joined, setJoinedLoading] = useState(true);

    // Functions to create the joined dataframe for the MixCharts
    const reestructure_sleep = (d,arra) => {
        var sleepDate = moment(d.End).subtract(1, "days").format('YYYY-MM-DD')
        return arra.push( { Time_asleep_seconds: d.Time_asleep_seconds,
                            End: sleepDate,
                            Sleep_quality: d.Sleep_quality.slice(0, d.Sleep_quality.indexOf('%')),
                            Weekday: moment(sleepDate).isoWeekday() - 1 } );
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

    const getJoinedData= (sleepD,foodD) => {
        const restr_sleep = []
        const restr_food = []
        sleepD.map( d => reestructure_sleep(d, restr_sleep))
        foodD.map( d => reestructure_food(d, restr_food))
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
        return result;
    }

    // Functions to fetch the data
    const fetchSleepData = () => {
        firestore.collection('users')
            .doc(userId)
            .collection('sleep')
            .onSnapshot( (snapshot) => {
                // console.log("Sleep data in firebase modified, getting the new data")
                const sleepData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                if (sleepData) {
                    setAllSleepData(sleepData)
                    setSleepLoading(false); 
                } else {
                    console.log("no sleepData")
                }
            },(error) => {
                console.log(error)
            }
            )
    }

    const fetchFoodData = () => {
        firestore.collection('users')
            .doc(userId)
            .collection('food')
            .onSnapshot( (snapshot) => {
                // console.log("Food data in firebase modified, getting the new data")
                const foodData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                if (foodData) {
                    setAllFoodData(foodData)
                    setFoodLoading(false);                 
                } else {
                    console.log("no foodData")
                }
            },(error) => {
                console.log(error)
            }
            )
      }

    // Load the data, sleep and food
    useEffect(() => {
        fetchSleepData();
        fetchFoodData();
    }, []);

    // Set joined data
    useEffect(() => {
        setJoinedData(getJoinedData(allSleepData, allFoodData));
        setJoinedLoading(false)
    }, [allSleepData, allFoodData]);

    return (
        <div className="analyticsContainer">
            <IonItemDivider color="tertiary">Sleep time</IonItemDivider>
            {loading_sleep && <div>Loading...</div>}
            {!loading_sleep && <CreateSleepBarCharts sleepData={allSleepData} loading_sleep={loading_sleep}/>}
            <IonItemDivider color="tertiary">Food consumed by category</IonItemDivider>
            {loading_food && <div>Loading...</div>}
            {!loading_food && <CreateFoodCharts foodData={allFoodData} loading_food={loading_food}/>}
            <IonItemDivider color="tertiary">Sleep vs food</IonItemDivider>
            {loading_food && <div>Loading..</div>}
            {!loading_food && <CreateMixCharts joinedData={joinedData} loading_joined={loading_joined} />}
            
        </div>
    );
};

export default AnalyticsContainer;
