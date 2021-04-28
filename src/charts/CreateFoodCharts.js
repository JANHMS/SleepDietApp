// @ts-nocheck
import React, { useEffect, useState } from 'react';
import CategoriesCountChart from "../charts/CategoriesCountChart";

// To change the csv path so as to get it from firebase/json
const CreateFoodCharts = (props) => {
    // To store count data
    const [categoriesCount, setCategoriesCount] = useState([]);

    const [show_count, setShowCountChart] = React.useState(true);

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
            console.log(item)
            if(item['Category'] !== undefined){
                var db_categories = item['Category']
                for (var i = 0; i < categoryLabels.length; i++) {
                    var category = categoryLabels[i]
                    if( db_categories.includes(category) ){
                        categoryCount[category] = categoryCount[category] + 1
                    }
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

    // const buttonClickSetGraph = (name) => {
    //   if(name == x_labels[0]) {
    //     setShowCountChart(true)
    //     setColorCountButton("primary")
    //   }
    // }    

    return (
      <div>
          {loading && <div>Drawing graph...</div>}
          {!loading && show_count && <CategoriesCountChart labels={shortLabels} data={categoriesCount} name="Overall category count in %"/>}
      </div>
    );
}

export default CreateFoodCharts;
