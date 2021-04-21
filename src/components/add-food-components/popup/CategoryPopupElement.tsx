import React from "react";
import {IonCard, IonItem, IonLabel} from "@ionic/react";
import "./CategoryPopup.css";
import clsx from "clsx";

const CategoryPopupElement: React.FC<{
    name: string,
    description: string,
    cssClassName: string,
}> = ({name, description, cssClassName}) => (
    <IonItem>
        <IonCard className={clsx(cssClassName)}/>
        <IonLabel>
            <h3><b>{name}</b></h3>
            <p>{description}</p>
        </IonLabel>
    </IonItem>
);

export default CategoryPopupElement;