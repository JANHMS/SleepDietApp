import React from 'react';
import {
    IonCard,
    IonCardTitle,
} from '@ionic/react';
import "./Category.css"

interface CategoryProps {
    name: string;
    cssClassName: string;
}

export const Category: React.FC<CategoryProps> = ({name, cssClassName}) => {
    return (
        <div>
            <IonCard button type="button" className={cssClassName}/>
            <IonCardTitle>{name}</IonCardTitle>
        </div>
    );
};
