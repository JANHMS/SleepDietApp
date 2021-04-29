import React, {useEffect, useState} from 'react';
import {
    IonItem,
    IonTextarea,
} from '@ionic/react';
import "./NotesComponent.css";

interface NotesProps {
    updateParent: (notes: string) => void,
    defaultValue: string,
}

export const NotesComponent: React.FC<NotesProps> = ({updateParent, defaultValue}) => {
    const [text, setText] = useState<string>(defaultValue);

    useEffect(() => {
        // Set selected state at the time when component receives the props
        setText(defaultValue);
    }, [defaultValue])

    useEffect(() => {
        updateParent(text)
    }, [text])

    return (
        <IonItem>
            <IonTextarea
                placeholder="Add your notes here..."
                value={text}
                onIonChange={e => setText(e.detail.value!)}
                className="customInput"
            />
        </IonItem>
    );
};

