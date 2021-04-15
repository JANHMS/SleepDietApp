import './AddFoodContainer.css';
import {DateTimePicker} from "./datepicker/DateTimePicker";
import {FoodCategoriesComponent} from "./categories/FoodCategoriesComponent";
import {IonButton, IonItemDivider} from "@ionic/react";
import React from "react";
import FoodDetailsComponent from "./details/FoodDetailsComponent";
import {NotesComponent} from "./notes/NotesComponent";

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
            <NotesComponent/>
            <IonButton color="tertiary" size="small">Save</IonButton>
        </div>
    );
};

export default AddFoodContainer;
