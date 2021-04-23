// @ts-nocheck
import React, { useEffect, useState } from 'react';
import CategoriesCountChart from "../charts/CategoriesCountChart";
import { IonGrid, IonRow } from '@ionic/react';
import { IonButton } from '@ionic/react';

// To change the csv path so as to get it from firebase/json
const CreateFoodCharts = (props) => {
    // console.log(props.foodData)
    // To store count data
    const [categoriesCount, setCategoriesCount] = useState([]);

    const [show_count, setShowCountChart] = React.useState(true);

    // X-axis for the different graphs. FYI: Monday=0, Sunday=6; January=1, December=12
    const x_labels = ['Count']
    const shortLabels = ["Caff. drink", "Dai.", "Fru.", "Gra.", "Prot. food", "Sna.", "Soft drink", "Veg."]

    // Control button colors
    const [colorCountButton, setColorCountButton] = React.useState("primary");        
    
    // State the loading variable for the graph, necessary to show the first graph
    const [loading, setLoading] = useState(true);    

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
            setCategoriesCount(getCount(props.foodData))        
            setLoading(false)   
        } else {
            console.log("no foodData")
        }
    }, []);

    const buttonClickSetGraph = (name) => {
      if(name == x_labels[0]) {
        setShowCountChart(true)
        setColorCountButton("primary")
      }
    }    

    return (
      <div>
          <IonGrid>
            <IonRow>
              <IonButton
                color={colorCountButton}
                onClick={ () => buttonClickSetGraph(x_labels[0])}
                size="small"
                shape="round" fill="outline"
              >
                { x_labels[0] }
              </IonButton>
            </IonRow>
          </IonGrid>
          {loading && <div>Drawing graph...</div>}
          {!loading && show_count && <CategoriesCountChart labels={shortLabels} data={categoriesCount} name="Category Count"/>}
      </div>
    );
}

export default CreateFoodCharts;
