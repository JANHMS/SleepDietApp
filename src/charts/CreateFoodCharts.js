// @ts-nocheck
import React, { useEffect, useState } from 'react';
import WeekdayChart from "../charts/WeekdayChart";
import CategoriesCountChart from "../charts/CategoriesCountChart";

import * as d3 from 'd3';
import DataFrame from 'dataframe-js';
import { IonButton } from '@ionic/react'
import { IonGrid, IonRow, IonCol, IonContent } from '@ionic/react';

// To change the csv path so as to get it from firebase/json
function CreateFoodCharts() {
    // To store the original data reestructured for the graphs
    const [data, setData] = React.useState([]);

    // To store count data
    const [categoriesCount, setCategoriesCount] = React.useState([]);

    // To control which graph to show
    const [show_count, setShowCount] = React.useState(true);
    // const [month_chart, setMonthChart] = React.useState(false);
    // const [day_chart, setDayChart] = React.useState(false);

    // To control the graphs are shown when reloading the page
    const [loading, setLoading] = React.useState(true);

    // X-axis for the different graphs. FYI: Monday=0, Sunday=6; January=1, December=12
    const x_labels = ['Count', 'Other']
    const shortLabels = ["Caff. drink", "Dai.", "Fru.", "Gra.", "Prot. food", "Sna.", "Soft drink", "Veg."]

    const getCount = (data) => {
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
            var categories = item['Category'].split(",")
            for (var i = 0; i < categoryLabels.length; i++) {
                var category = categoryLabels[i]
                if( categories.includes(category) ){
                    categoryCount[category] = categoryCount[category] + 1
                }
              }
        } );

        return categoryCount;
      };    

    // Load the data
    useEffect(() => {
      d3.csv("./food_parsed.csv").then((original_data) => {
        var aux_dict = {}
        setData(original_data);
        setCategoriesCount(getCount(original_data))
        setLoading(false);
      })
      .catch(error => console.error(error));;
      return () => undefined;
    }, []);

    const buttonClickSetGraph = (name) => {
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
          {!loading && show_count && <CategoriesCountChart labels={shortLabels} data={categoriesCount} name="Category Count" />}
        </header>
      </div>
    );
}

export default CreateFoodCharts;
