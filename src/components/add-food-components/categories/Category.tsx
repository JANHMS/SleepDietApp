import React, {useEffect, useState} from 'react';
import {
    IonCard,
    IonCardTitle,
} from '@ionic/react';
import "./Category.css"
import clsx from "clsx";

interface CategoryProps {
    name: string,
    cssClassName: string,
    onSelect: (name: string) => void,
    selected: boolean,
}

export const Category: React.FC<CategoryProps> = ({name, cssClassName, onSelect, selected}) => {
    // Too early to set default state, at this point "selected" hasn't arrived yet
    const [isSelected, setSelected] = useState<boolean>(selected);

    useEffect(() => {
        // Set selected state at the time when component receives the props
        setSelected(selected)
    }, [selected])

    return (
        <div>
            <IonCard button type="button" className={clsx(isSelected && "selected", cssClassName, "categoryCard")}
                     onClick={e => {
                         setSelected(!isSelected)
                         onSelect(name);
                     }}/>
            <IonCardTitle>{name}</IonCardTitle>
        </div>
    );
};
