// @ts-nocheck
import React, { useEffect, useState } from 'react';
import CategoriesCountChart from "./CategoriesCountChart";

const CreateFoodCharts = (props) => {

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

    return (
      <div>
          <CategoriesCountChart labels={shortLabels} data={getCount(props.foodData)} name="Overall category count in %"/>
      </div>
    );
}

export default CreateFoodCharts;
