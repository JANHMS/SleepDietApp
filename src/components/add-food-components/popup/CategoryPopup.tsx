import React from "react";
import {IonButton, IonList, IonContent} from "@ionic/react";
import "./CategoryPopup.css";
import CategoryPopupElement from "./CategoryPopupElement";
import {CategoryType} from "../categories/CategoryType";

const CategoryPopup: React.FC<{
    onDismiss: () => void;
}> = ({onDismiss}) => (
    <IonContent>
        <IonList>
            <CategoryPopupElement name={CategoryType.Fruits} description="asd" cssClassName="fruit"/>
            <CategoryPopupElement name={CategoryType.Vegetables} description="asd" cssClassName="veg"/>
            <CategoryPopupElement name={CategoryType.Grains} description="asd" cssClassName="grains"/>
            <CategoryPopupElement name={CategoryType.Dairy} description="asd" cssClassName="dairy"/>
            <CategoryPopupElement name={CategoryType.ProteinFood} description="asd" cssClassName="protein"/>
            <CategoryPopupElement name={CategoryType.Snacks} description="asd" cssClassName="snacks"/>
            <CategoryPopupElement name={CategoryType.CaffeinatedDrinks} description="asd" cssClassName="coffee"/>
            <CategoryPopupElement name={CategoryType.SoftDrinks} description="asd" cssClassName="softDrinks"/>
        </IonList>
        <IonButton expand="block" onClick={() => onDismiss()}>
            Close
        </IonButton>
    </IonContent>
);

export default CategoryPopup;