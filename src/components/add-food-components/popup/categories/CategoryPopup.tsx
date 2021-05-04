import React from "react";
import {IonList, IonContent, IonTitle, IonToolbar, IonIcon} from "@ionic/react";
import "./CategoryPopup.css";
import CategoryPopupElement from "./CategoryPopupElement";
import {CategoryType} from "../../categories/CategoryType";
import {closeCircleOutline} from "ionicons/icons";
import {Constant} from "../../../../consts";

const CategoryPopup: React.FC<{
    onDismiss: () => void;
}> = ({onDismiss}) => (
    <IonContent>
        <IonToolbar>
            <IonTitle>
                <h3><b>Categories</b></h3>
            </IonTitle>
            <IonIcon className="popupClose" slot="end" icon={closeCircleOutline} onClick={() => onDismiss()}/>
        </IonToolbar>

        <IonList>
            <CategoryPopupElement name={CategoryType.Fruits} description={Constant.fruitExamples} cssClassName="fruit"/>
            <CategoryPopupElement name={CategoryType.Vegetables} description={Constant.vegetablesExamples} cssClassName="veg"/>
            <CategoryPopupElement name={CategoryType.Grains} description={Constant.grainsExamples} cssClassName="grains"/>
            <CategoryPopupElement name={CategoryType.Dairy} description={Constant.dairyExamples} cssClassName="dairy"/>
            <CategoryPopupElement name={CategoryType.ProteinFood} description={Constant.proteinExamples} cssClassName="protein"/>
            <CategoryPopupElement name={CategoryType.Snacks} description={Constant.snacksExamples} cssClassName="snacks"/>
            <CategoryPopupElement name={CategoryType.CaffeinatedDrinks + " / Alcohol"} description={Constant.caffeinatedExamples} cssClassName="coffee"/>
            <CategoryPopupElement name={CategoryType.SoftDrinks} description={Constant.softDrinkExamples} cssClassName="softDrinks"/>
        </IonList>

    </IonContent>
);

export default CategoryPopup;