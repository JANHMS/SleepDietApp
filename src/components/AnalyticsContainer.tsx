// @ts-nocheck
import './AnalyticsContainer.css';
import CreateSleepBarCharts from "../charts/CreateSleepBarCharts";
import CreateFoodCharts from "../charts/CreateFoodCharts";
import {IonItemDivider} from "@ionic/react";
import CreateMixCharts from "../charts/CreateMixCharts";
import React, { useEffect, useState } from 'react';
import { firestore } from "../firebase";

interface ContainerProps {
    name: string;
}

const AnalyticsContainer: React.FC<ContainerProps> = ({ name }) => {
    // We getch the data here to no do it inside each family type of graphs
    // userId to get the data in firebase
    const userId = "1"    

    // To store sleep and food data from the user in the database
    const [allSleepData, setAllSleepData] = useState([]); 
    const [allFoodData, setAllFoodData] = useState([]); 

    // To control the graphs are shown when reloading the page
    const [loading_sleep, setSleepLoading] = useState(true);
    const [loading_food, setFoodLoading] = useState(true);

    const fetchSleepData = () => {
        firestore.collection('users')
            .doc(userId)
            .collection('sleep')
            .get()
            .then(snapshot => {
                const sleepData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                if (sleepData) {
                    //console.log(sleepData)
                    setAllSleepData(sleepData)
                    setSleepLoading(false); 
                } else {
                    console.log("no sleepData")
                }
            })
    }

    const fetchFoodData = () => {
        firestore.collection('users')
            .doc(userId)
            .collection('food')
            .get()
            .then(snapshot => {
                const foodData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                if (foodData) {
                    //console.log(foodData)
                    setAllFoodData(foodData)
                    setFoodLoading(false);                 
                } else {
                    console.log("no foodData")
                }
            })
      }

    // Load the data, sleep and food
    useEffect(() => {
        fetchSleepData();
        fetchFoodData();
    }, []);      

    return (
        <div className="analyticsContainer">
            <IonItemDivider color="tertiary">Sleep time</IonItemDivider>
            {loading_sleep && <div>loading</div>}
            {!loading_sleep && <CreateSleepBarCharts sleepData={allSleepData} loading_sleep={loading_sleep}/>}
            <IonItemDivider color="tertiary">Food consumed by category</IonItemDivider>
            {loading_food && <div>loading</div>}
            {!loading_food && <CreateFoodCharts foodData={allFoodData} loading_food={loading_food}/>}
            <IonItemDivider color="tertiary">Sleep vs food</IonItemDivider>
            {loading_food && <div>loading</div>}
            {!loading_food && <CreateMixCharts sleepData={allSleepData} loading_sleep={loading_sleep} foodData={allFoodData} loading_food={loading_food}/>}
            
        </div>
    );
};

export default AnalyticsContainer;
