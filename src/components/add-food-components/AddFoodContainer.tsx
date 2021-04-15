import './AddFoodContainer.css';
import {DateTimePicker} from "./DateTimePicker";
import {FoodCategoriesComponent} from "./FoodCategoriesComponent";
import {IonItemDivider} from "@ionic/react";
import React from "react";
import FoodDetailsComponent from "./FoodDetailsComponent";

interface ContainerProps {
    name: string;
}

const AddFoodContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="foodContainer">
            <DateTimePicker/>
            <IonItemDivider color="tertiary">Dinner</IonItemDivider>
            <FoodCategoriesComponent/>
            <IonItemDivider color="tertiary">Dinner details</IonItemDivider>
            <FoodDetailsComponent/>
            <IonItemDivider color="tertiary">Notes</IonItemDivider>
        </div>
    );
};

export default AddFoodContainer;
