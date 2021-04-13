import React, {useState} from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import {Category} from "./Category";
import "./FoodCategoriesComponent.css"
import {CategoryType} from "./CategoryType";

export const FoodCategoriesComponent: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

    const updateSelectedCategories = (category: string) => {
        if(selectedCategories.has(category)) {
            selectedCategories.delete(category);
        }
        else {
            selectedCategories.add(category);
        }
        setSelectedCategories(selectedCategories);
        console.log(selectedCategories);
    }

    return (
        <div>
            <IonGrid>
                <IonRow>
                    <IonCol><Category name={CategoryType.Fruit} onSelect={updateSelectedCategories} cssClassName="fruit"/></IonCol>
                    <IonCol><Category name={CategoryType.Vegetables} onSelect={updateSelectedCategories} cssClassName="veg"/></IonCol>
                    <IonCol><Category name={CategoryType.Grains} onSelect={updateSelectedCategories} cssClassName="grains"/></IonCol>
                    <IonCol><Category name={CategoryType.Dairy} onSelect={updateSelectedCategories} cssClassName="dairy"/></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><Category name={CategoryType.ProteinFood} onSelect={updateSelectedCategories} cssClassName="protein"/></IonCol>
                    <IonCol><Category name={CategoryType.Snacks} onSelect={updateSelectedCategories} cssClassName="snacks"/></IonCol>
                    <IonCol><Category name={CategoryType.CaffeinatedDrinks} onSelect={updateSelectedCategories} cssClassName="coffee"/></IonCol>
                    <IonCol><Category name={CategoryType.SoftDrinks} onSelect={updateSelectedCategories} cssClassName="softDrinks"/></IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
}