import '../AddFoodContainer.css';
import {RangeSlider} from "./RangeSlider";
import React, {useEffect} from "react";

interface FoodDetailsProps {
    updateWellness: (value: number) => void,
    updateFullness: (value: number) => void,
    updateFatness: (value: number) => void,
    defaultWellness: number,
    defaultFullness: number,
    defaultFatness: number,
}

const FoodDetailsComponent: React.FC<FoodDetailsProps> =
    ({updateWellness, updateFullness, updateFatness,
         defaultWellness, defaultFullness, defaultFatness}) => {
    return (
        <div>
            <RangeSlider title="My stomach feels..." labels={["Unwell", "Good"]}
                         onChange={value => updateWellness(value)}
                         defaultValue={defaultWellness}/>
            <RangeSlider title="I am..." labels={["Hungry", "Full"]} onChange={value => updateFullness(value)}
                         defaultValue={defaultFullness}/>
            <RangeSlider title="The dinner was..." labels={["Light", "Fatty"]} onChange={value => updateFatness(value)}
                         defaultValue={defaultFatness}/>
        </div>
    );
};

export default FoodDetailsComponent;
