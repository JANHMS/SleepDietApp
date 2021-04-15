import React, {useState} from 'react';
import {
    IonInput,
    IonItem,
} from '@ionic/react';
import "./NotesComponent.css";

export const NotesComponent: React.FC = () => {

    const [text, setText] = useState<string>("");

    return (
        <IonItem>
            {console.log(text)}
            <IonInput
                placeholder="Add your notes here..."
                value={text}
                onIonChange={e => setText(e.detail.value!)}
                className="customInput"
            />
        </IonItem>
    );
};