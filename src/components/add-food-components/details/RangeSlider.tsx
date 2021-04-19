import React, {useEffect, useState} from 'react';
import {
    IonItem,
    IonRange,
    IonLabel,
} from '@ionic/react';
import "./RangeSlider.css"

interface RangeSliderProps {
    title: string,
    labels: Array<string>,
    onChange: (value: number) => void,
}

export const RangeSlider: React.FC<RangeSliderProps> = ({title, labels, onChange}) => {
    const [value, setValue] = useState(5);

    useEffect(() => {
        onChange(value);
    }, [value])

    return (
        <IonItem>
            <IonLabel position="floating">{title}</IonLabel> <br/>
            <IonRange
                // pin={true}
                min={1}
                max={10}
                step={1}
                snaps={true}
                color="secondary"
                value={value}
                onIonChange={e => setValue(e.detail.value as number)}
            >
                <IonLabel slot="start">{labels[0]}</IonLabel>
                <IonLabel slot="end">{labels[1]}</IonLabel>
            </IonRange>
        </IonItem>
    );
};