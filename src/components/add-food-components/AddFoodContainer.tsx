import './AddFoodContainer.css';
import {DateTimePicker} from "./datepicker/DateTimePicker";
import {FoodCategoriesComponent} from "./categories/FoodCategoriesComponent";
import {IonButton, IonItemDivider, useIonToast} from "@ionic/react";
import React, {useEffect, useState} from "react";
import FoodDetailsComponent from "./details/FoodDetailsComponent";
import {NotesComponent} from "./notes/NotesComponent";
import moment from "moment/moment";
import {firestore} from "../../firebase";
import {Constant} from "../../consts";

interface ContainerProps {
    name: string;
}

interface FoodData {
    id?: string,
    Date: string,
    Category: string[],
    Unwell_Well: string,
    Hungry_Overate: string,
    NonFatty_Fatty: string,
    Notes: string
}

const AddFoodContainer: React.FC<ContainerProps> = ({name}) => {
    const [present, dismiss] = useIonToast();
    const defaultFoodData: FoodData = {
        Date: moment().format(Constant.fullDateFormatDB),
        Category: [],
        Unwell_Well: "5",
        Hungry_Overate: "5",
        NonFatty_Fatty: "5",
        Notes: ""
    }
    const [selectedDate, setSelectedDate] = useState<string>(defaultFoodData.Date.split(" ")[0]);
    const [selectedTime, setSelectedTime] = useState<string>(defaultFoodData.Date.split(" ")[1]);
    // Array of selected food categories
    const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultFoodData.Category);
    // Value of wellness (1: Unwell - 10: Good)
    const [wellness, setWellness] = useState<string>(defaultFoodData.Unwell_Well);
    // Value of fullness (1: Hungry - 10: Full)
    const [fullness, setFullness] = useState<string>(defaultFoodData.Hungry_Overate);
    // Value of fatness of food (1: Light - 10: Fatty)
    const [fatness, setFatness] = useState<string>(defaultFoodData.NonFatty_Fatty);
    // Notes added by the user
    const [notes, setNotes] = useState<string>(defaultFoodData.Notes);

    // All food data which belongs to the user in the DB
    const [allFoodData, setAllFoodData] = useState<any>([]);
    // Food data for the selected day
    const [foodDataSelectedDay, setFoodDataSelectedDay] = useState<FoodData>();
    // Food data is edited and can be send to DB
    const [isEdited, setIsEdited] = useState<boolean>(false);

    //userId is hardcoded but can be retrieved with authentication
    const userId = "1";

    // Fetch all food data for the first time
    useEffect(() => {
        fetchFoodData();
    }, [])

    useEffect(() => {
        if (allFoodData.length > 0) {
            const dateSelected = selectedDate.split(" ")[0];
            // Get food data for today (if entered) to send it to components as default values
            const filtered = allFoodData.filter((foodEntry: any) => foodEntry.Date.split(" ")[0] === dateSelected);
            // Set default values to send to components
            if (filtered.length > 0) {
                // Assuming that there is only 1 entry for each day, so it's okay to get the first one
                // Because the length is always 1 (in theory)
                const dataForSelectedDay = filtered[0];
                setFoodDataSelectedDay(dataForSelectedDay);
                setProps(dataForSelectedDay)
            }
            // The user selected a date where no food is entered yet
            else {
                const currentTime = moment().format(Constant.timeFormatDB);
                const dateSelected = selectedDate.split(" ")[0];
                const momentToSelect = moment(dateSelected + " " + currentTime, Constant.fullDateFormatDB)
                    .format(Constant.fullDateFormatDB)
                setProps({
                    Date: momentToSelect,
                    Category: defaultFoodData.Category,
                    Unwell_Well: defaultFoodData.Unwell_Well,
                    Hungry_Overate: defaultFoodData.Hungry_Overate,
                    NonFatty_Fatty: defaultFoodData.NonFatty_Fatty,
                    Notes: defaultFoodData.Notes
                })
                setFoodDataSelectedDay(undefined)
            }
        }
    }, [selectedDate, allFoodData])

    useEffect(() => {
        setIsEdited(propsChangedComparedTo(foodDataSelectedDay ? foodDataSelectedDay : defaultFoodData))
    }, [selectedDate, selectedTime, selectedCategories, wellness, fullness, fatness, notes])

    const setProps = (newProps: FoodData) => {
        setSelectedDate(newProps.Date.split(" ")[0]);
        setSelectedTime(newProps.Date.split(" ")[1]);
        setSelectedCategories(newProps.Category);
        setWellness(newProps.Unwell_Well);
        setFullness(newProps.Hungry_Overate);
        setFatness(newProps.NonFatty_Fatty);
        setNotes(newProps.Notes);
    }

    const propsChangedComparedTo = (data: FoodData) => {
        return selectedDate !== data.Date.split(" ")[0]
            || selectedTime !== data.Date.split(" ")[1]
            || selectedCategories !== data.Category
            || wellness !== data.Unwell_Well
            || fullness !== data.Hungry_Overate
            || fatness !== data.NonFatty_Fatty
            || notes !== data.Notes
    }

    const fetchFoodData = () => {
        firestore.collection('users')
            .doc(userId)
            .collection('food')
            .get()
            .then(snapshot => {
                const foodData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
                if (foodData) {
                    setAllFoodData(foodData)
                } else {
                    console.log("no foodData")
                }
            })
    }

    const handlePostData = (id?: string) => {
        firestore.collection("users")
            .doc(userId)
            .collection("food")
            .doc(id)
            .set({
                Date: selectedDate + " " + selectedTime,
                Category: selectedCategories,
                Unwell_Well: wellness.toString(),
                Hungry_Overate: fullness.toString(),
                NonFatty_Fatty: fatness.toString(),
                Notes: notes
            })
            .then(function () {
                // success
                present({
                    buttons: [{
                        text: 'ok', handler: () => {dismiss()}
                    }],
                    message: 'Your food data is saved successfully!',
                    duration: 2500,
                    color: "success",
                })
                // Fetch fresh data after successful post to have the latest entries here
                fetchFoodData();
                setIsEdited(false);
            }, function (err) {
                // error
                present({
                    buttons: [{
                        text: 'try again', handler: () => {
                            dismiss();
                            handlePostData(foodDataSelectedDay && foodDataSelectedDay.id);
                        }
                    }],
                    message: 'Oops.. Something went wrong :(',
                    duration: 2500,
                    color: "error",
                })
            });
        console.log('sent data', {
            id: foodDataSelectedDay && foodDataSelectedDay.id,
            Date: selectedDate + " " + selectedTime,
            Category: selectedCategories,
            Unwell_Well: wellness.toString(),
            Hungry_Overate: fullness.toString(),
            NonFatty_Fatty: fatness.toString(),
            Notes: notes
        });
    }

    return (
        <div className="foodContainer">
            <DateTimePicker updateParent={date => {
                setSelectedDate(date.split(" ")[0])
                setSelectedTime(date.split(" ")[1])
            }} defaultValue={selectedDate + " " + selectedTime}/>
            <IonItemDivider color="tertiary">Dinner</IonItemDivider>
            <FoodCategoriesComponent updateParent={categories => setSelectedCategories(categories)}
                                     defaultValue={selectedCategories}/>
            <IonItemDivider color="tertiary">Dinner details</IonItemDivider>
            <FoodDetailsComponent
                updateWellness={value => setWellness(value.toString())}
                updateFullness={value => setFullness(value.toString())}
                updateFatness={value => setFatness(value.toString())}
                // Convert string to number with "+"
                defaultWellness={+wellness}
                defaultFullness={+fullness}
                defaultFatness={+fatness}
            />
            <IonItemDivider color="tertiary">Notes</IonItemDivider>
            <NotesComponent updateParent={notes => setNotes(notes)} defaultValue={notes}/>
            <IonButton
                className="save"
                color="tertiary"
                size="small"
                disabled={selectedCategories.length < 1 || !isEdited}
                onClick={() => handlePostData(foodDataSelectedDay && foodDataSelectedDay.id)}
            >Save</IonButton>
        </div>
    );
};

export default AddFoodContainer;
