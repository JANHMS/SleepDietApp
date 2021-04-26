import React from "react";
import {IonCard, IonItem, IonLabel} from "@ionic/react";
import clsx from "clsx";
import "./CategoryPopupElement.css";

const CategoryPopupElement: React.FC<{
    name: string,
    description: string,
    cssClassName: string,
}> = ({name, description, cssClassName}) => (
    <IonItem>

        <IonCard className={clsx(cssClassName, "popupCategory")}/>
        <IonLabel className={clsx("popupElementLabel", "ion-text-wrap")}>
            <h3><b>{name}</b></h3>
            <p>{description}</p>
        </IonLabel>
    </IonItem>
);

export default CategoryPopupElement;