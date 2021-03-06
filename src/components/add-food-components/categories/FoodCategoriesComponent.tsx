import React, {useEffect, useState} from 'react';
import {IonGrid, IonRow, IonCol} from '@ionic/react';
import {Category} from "./Category";
import "./FoodCategoriesComponent.css"
import {CategoryType} from "./CategoryType";

interface FoodCategoriesProps {
    updateParent: (categories: string[]) => void,
    defaultValue: string[]
}

export const FoodCategoriesComponent: React.FC<FoodCategoriesProps> = ({updateParent, defaultValue}) => {
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(defaultValue));

    useEffect(() => {
        // Set selected state at the time when component receives the props
        setSelectedCategories(new Set(defaultValue));
    }, [defaultValue])

    const updateSelectedCategories = (category: string) => {
        if (selectedCategories.has(category)) {
            selectedCategories.delete(category);
        } else {
            selectedCategories.add(category);
        }
        setSelectedCategories(selectedCategories);
        updateParent(Array.from(selectedCategories.values()));
    }

    return (
        <div>
            <IonGrid>
                <IonRow>
                    <IonCol><Category categoryName={CategoryType.Fruits}
                                      label={CategoryType.Fruits}
                                      onSelect={updateSelectedCategories}
                                      cssClassName="fruit"
                                      selected={selectedCategories.has(CategoryType.Fruits)}/></IonCol>
                    <IonCol><Category categoryName={CategoryType.Vegetables}
                                      label={CategoryType.Vegetables}
                                      onSelect={updateSelectedCategories}
                                      cssClassName="veg"
                                      selected={selectedCategories.has(CategoryType.Vegetables)}/></IonCol>
                    <IonCol><Category categoryName={CategoryType.Grains}
                                      label={CategoryType.Grains}
                                      onSelect={updateSelectedCategories}
                                      cssClassName="grains"
                                      selected={selectedCategories.has(CategoryType.Grains)}/></IonCol>
                    <IonCol><Category categoryName={CategoryType.Dairy}
                                      label={CategoryType.Dairy}
                                      onSelect={updateSelectedCategories}
                                      cssClassName="dairy"
                                      selected={selectedCategories.has(CategoryType.Dairy)}/></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><Category categoryName={CategoryType.ProteinFood}
                                      label={CategoryType.ProteinFood}
                                      onSelect={updateSelectedCategories}
                                      cssClassName="protein"
                                      selected={selectedCategories.has(CategoryType.ProteinFood)}/></IonCol>
                    <IonCol><Category categoryName={CategoryType.Snacks}
                                      label={CategoryType.Snacks}
                                      onSelect={updateSelectedCategories}
                                      cssClassName="snacks"
                                      selected={selectedCategories.has(CategoryType.Snacks)}/></IonCol>
                    <IonCol><Category categoryName={CategoryType.CaffeinatedDrinks}
                                      label={CategoryType.CaffeinatedDrinks + " / Alcohol"}
                                      onSelect={updateSelectedCategories}
                                      cssClassName="coffee"
                                      selected={selectedCategories.has(CategoryType.CaffeinatedDrinks)}/></IonCol>
                    <IonCol><Category categoryName={CategoryType.SoftDrinks}
                                      label={CategoryType.SoftDrinks}
                                      onSelect={updateSelectedCategories}
                                      cssClassName="softDrinks"
                                      selected={selectedCategories.has(CategoryType.SoftDrinks)}/></IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
}