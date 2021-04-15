import './AddFoodContainer.css';
import {DateTimePicker} from "./datepicker/DateTimePicker";
import {FoodCategoriesComponent} from "./categories/FoodCategoriesComponent";
import {IonButton, IonItemDivider, useIonToast} from "@ionic/react";
import React from "react";
import FoodDetailsComponent from "./details/FoodDetailsComponent";
import {NotesComponent} from "./notes/NotesComponent";

interface ContainerProps {
    name: string;
}

const AddFoodContainer: React.FC<ContainerProps> = ({ name }) => {
    const [present, dismiss] = useIonToast();

    return (
        <div className="foodContainer">
            <DateTimePicker/>
            <IonItemDivider color="tertiary">Dinner</IonItemDivider>
            <FoodCategoriesComponent/>
            <IonItemDivider color="tertiary">Dinner details</IonItemDivider>
            <FoodDetailsComponent/>
            <IonItemDivider color="tertiary">Notes</IonItemDivider>
            <NotesComponent/>
            <IonButton
                color="tertiary"
                size="small"
                onClick={() =>
                    present({
                        buttons: [{text: 'ok', handler: () => dismiss()}],
                        message: 'Your food data is saved successfully!',
                        duration: 2500,
                        color: "success",
                    })
                }
            >Save</IonButton>
        </div>
    );
};

export default AddFoodContainer;
