import React, {useEffect, useState} from 'react';
import {
    IonItem,
    IonLabel,
    IonDatetime,
} from '@ionic/react';
import moment from "moment/moment";
import "./DateTimePicker.css";

interface DateTimeProps {
    updateParent: (selectedDate: string) => void
}

export const DateTimePicker: React.FC<DateTimeProps> = ({updateParent}) => {
    // use format() to convert Moment object to string
    const [selectedDate, setSelectedDate] = useState<string>(moment().format());

    return (
        <div>
            <IonItem>
                <IonLabel>Date of dinner</IonLabel>
                <IonDatetime displayFormat="DDDD MMM D, YYYY" min="2015" max="2021" value={selectedDate}
                             onIonChange={e => {
                                 setSelectedDate(e.detail.value!);
                                 const formatted = moment(e.detail.value!).format('DD.MM.YY HH:mm')
                                 updateParent(formatted);
                             }}/>
            </IonItem>
            <IonItem>
                <IonLabel>Time of dinner</IonLabel>
                <IonDatetime displayFormat="H:mm" value={selectedDate}
                             onIonChange={e => setSelectedDate(e.detail.value!)}/>
            </IonItem>
        </div>
    );
};