import './AddFoodContainer.css';
import {DateTimePicker} from "./datepicker/DateTimePicker";
import {FoodCategoriesComponent} from "./categories/FoodCategoriesComponent";
import {IonButton, IonItemDivider, useIonToast} from "@ionic/react";
import React, {useEffect, useState} from "react";
import FoodDetailsComponent from "./details/FoodDetailsComponent";
import {NotesComponent} from "./notes/NotesComponent";
import moment from "moment/moment";

interface ContainerProps {
    name: string;
}

const AddFoodContainer: React.FC<ContainerProps> = ({name}) => {
    const [present, dismiss] = useIonToast();
    // Stores the selected date in the following format: 'DD.MM.YY HH:mm'
    const [selectedDate, setSelectedDate] = useState<string>(moment().format('DD.MM.YY HH:mm'));
    // Array of selected food categories
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    // Value of wellness (1: Unwell - 10: Good)
    const [wellness, setWellness] = useState<number>(5);
    // Value of fullness (1: Hungry - 10: Full)
    const [fullness, setFullness] = useState<number>(5);
    // Value of fatness of food (1: Light - 10: Fatty)
    const [fatness, setFatness] = useState<number>(5);
    // Notes added by the user
    const [notes, setNotes] = useState<string>("");

    return (
        <div className="foodContainer">
            <DateTimePicker updateParent={date => setSelectedDate(date)}/>
            <IonItemDivider color="tertiary">Dinner</IonItemDivider>
            <FoodCategoriesComponent updateParent={categories => setSelectedCategories(categories)}/>
            <IonItemDivider color="tertiary">Dinner details</IonItemDivider>
            <FoodDetailsComponent
                updateWellness={value => setWellness(value)}
                updateFullness={value => setFullness(value)}
                updateFatness={value => setFatness(value)}
            />
            <IonItemDivider color="tertiary">Notes</IonItemDivider>
            <NotesComponent updateParent={notes => setNotes(notes)}/>
            <IonButton
                color="tertiary"
                size="small"
                onClick={() => {
                    present({
                        buttons: [{text: 'ok', handler: () => dismiss()}],
                        message: 'Your food data is saved successfully!',
                        duration: 2500,
                        color: "success",
                    })
                    console.log(selectedDate)
                    console.log(selectedCategories)
                    console.log(wellness)
                    console.log(fullness)
                    console.log(fatness)
                    console.log(notes)
                }
                }
            >Save</IonButton>
        </div>
    );
};

export default AddFoodContainer;
