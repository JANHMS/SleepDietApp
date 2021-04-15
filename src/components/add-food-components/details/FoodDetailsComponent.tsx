import '../AddFoodContainer.css';
import {RangeSlider} from "./RangeSlider";
import React from "react";

const FoodDetailsComponent: React.FC = () => {
    return (
        <div>
            <RangeSlider title="My stomach feels..." labels={["Unwell", "Good"]}/>
            <RangeSlider title="I am..." labels={["Hungry", "Full"]}/>
            <RangeSlider title="The dinner was..." labels={["Light", "Fatty"]}/>
        </div>
    );
};

export default FoodDetailsComponent;
