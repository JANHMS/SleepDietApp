import React, {useState} from 'react';
import {
    IonItem,
    IonLabel,
    IonDatetime,
} from '@ionic/react';
import moment from "moment/moment";
import "./DateTimePicker.css";

export const DateTimePicker: React.FC = () => {
    // use format() to convert Moment object to string
    const [selectedDate, setSelectedDate] = useState<string>(moment().format());

    return (
        <div>
            <IonItem>
                <IonLabel>Date of dinner</IonLabel>
                <IonDatetime displayFormat="DDDD MMM D, YYYY" min="2015" max="2021" value={selectedDate}
                             onIonChange={e => setSelectedDate(e.detail.value!)}/>
            </IonItem>
            <IonItem>
                <IonLabel>Time of dinner</IonLabel>
                <IonDatetime displayFormat="H:mm" value={selectedDate}
                             onIonChange={e => setSelectedDate(e.detail.value!)}/>
            </IonItem>
    {/*<IonFooter>*/}
    {/*    <IonToolbar>*/}
    {/*        Selected Date: {selectedDate ?? '(none)'}*/}
    {/*    </IonToolbar>*/}
    {/*</IonFooter>*/}
</div>
);
};