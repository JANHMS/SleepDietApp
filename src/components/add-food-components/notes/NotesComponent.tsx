import React, {useEffect, useState} from 'react';
import {
    IonInput,
    IonItem,
} from '@ionic/react';
import "./NotesComponent.css";

interface NotesProps {
    updateParent: (notes: string) => void
}

export const NotesComponent: React.FC<NotesProps> = ({updateParent}) => {
    const [text, setText] = useState<string>("");

    useEffect(() => {
        updateParent(text)
    }, [text])

    return (
        <IonItem>
            <IonInput
                placeholder="Add your notes here..."
                value={text}
                onIonChange={e => setText(e.detail.value!)}
                className="customInput"
            />
        </IonItem>
    );
};

