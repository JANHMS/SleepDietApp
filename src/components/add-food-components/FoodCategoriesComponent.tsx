import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import {Category} from "./Category";
import "./FoodCategoriesComponent.css"

export const FoodCategoriesComponent: React.FC = () => (
    <div>
        <IonGrid>
            <IonRow>
                <IonCol><Category name="Fruit" cssClassName="fruit"/></IonCol>
                <IonCol><Category name="Vegetables" cssClassName="veg"/></IonCol>
                <IonCol><Category name="Grains" cssClassName="grains"/></IonCol>
                <IonCol><Category name="Dairy" cssClassName="dairy"/></IonCol>
            </IonRow>
            <IonRow>
                <IonCol><Category name="Protein food" cssClassName="protein"/></IonCol>
                <IonCol><Category name="Snacks" cssClassName="snacks"/></IonCol>
                <IonCol><Category name="Caffeinated drinks" cssClassName="coffee"/></IonCol>
                <IonCol><Category name="Soft drinks" cssClassName="softDrinks"/></IonCol>
            </IonRow>
        </IonGrid>
    </div>
);