import '../AddFoodContainer.css';
import {RangeSlider} from "./RangeSlider";
import React from "react";

interface FoodDetailsProps {
    updateWellness: (value: number) => void,
    updateFullness: (value: number) => void,
    updateFatness: (value: number) => void,
}

const FoodDetailsComponent: React.FC<FoodDetailsProps> = ({updateWellness, updateFullness, updateFatness}) => {
    return (
        <div>
            <RangeSlider title="My stomach feels..." labels={["Unwell", "Good"]} onChange={value => updateWellness(value)}/>
            <RangeSlider title="I am..." labels={["Hungry", "Full"]} onChange={value => updateFullness(value)}/>
            <RangeSlider title="The dinner was..." labels={["Light", "Fatty"]} onChange={value => updateFatness(value)}/>
        </div>
    );
};

export default FoodDetailsComponent;
