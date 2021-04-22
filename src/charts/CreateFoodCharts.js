// @ts-nocheck
import React, { useEffect, useState } from 'react';
import CategoriesCountChart from "../charts/CategoriesCountChart";
import {IonItem} from '@ionic/react';
import { IonGrid, IonRow } from '@ionic/react';
import { IonButton } from '@ionic/react';

// To change the csv path so as to get it from firebase/json
const CreateFoodCharts = (props) => {
    console.log(props.foodData)
    // To store count data
    const [categoriesCount, setCategoriesCount] = useState([]);

    const [show_count, setShowCountChart] = React.useState(false);

    // X-axis for the different graphs. FYI: Monday=0, Sunday=6; January=1, December=12
    const x_labels = ['Count']
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
            var db_categories = item['Category']
            for (var i = 0; i < categoryLabels.length; i++) {
                var category = categoryLabels[i]
                if( db_categories.includes(category) ){
                    categoryCount[category] = categoryCount[category] + 1
                }
              }
        } );

        return categoryCount;
      };    

    useEffect(() => {
        if(!props.loading_food) {
            console.log(props.loading_food)
            setCategoriesCount(getCount(props.foodData))           
        } else {
            console.log("no foodData")
        }
    }, []);

    const buttonClickSetGraph = (name) => {
      if(name == x_labels[0]) {
        setShowCountChart(true)
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
          <IonItem>
            {props.loading_food && <div>loading</div>}
            {!props.loading_food && show_count && <CategoriesCountChart labels={shortLabels} data={categoriesCount} name="Category Count"/>}
          </IonItem>
      </div>
    );
}

export default CreateFoodCharts;
