import React, {useState} from 'react';
import {
    IonCard,
    IonCardTitle,
} from '@ionic/react';
import "./Category.css"
import clsx from "clsx";

interface CategoryProps {
    name: string;
    cssClassName: string;
}

export const Category: React.FC<CategoryProps> = ({name, cssClassName}) => {
    const [isSelected, setSelected] = useState<boolean>(false);

    return (
        <div>
            <IonCard button type="button" className={clsx(isSelected && "selected", cssClassName)}
                     onClick={e => setSelected(!isSelected)}/>
            <IonCardTitle>{name}</IonCardTitle>
        </div>
    );
};
