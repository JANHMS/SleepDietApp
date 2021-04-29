import React from "react";
import {IonText, IonContent, IonTitle, IonToolbar, IonIcon} from "@ionic/react";
import "./DinnerDetailsPopup.css";
import {closeCircleOutline} from "ionicons/icons";

const DinnerDetailsPopup: React.FC<{
    onDismiss: () => void;
}> = ({onDismiss}) => (
    <IonContent>
        <IonToolbar>
            <IonTitle>
                <h3><b>Details</b></h3>
            </IonTitle>
            <IonIcon className="popupClose" slot="end" icon={closeCircleOutline} onClick={() => onDismiss()}/>
        </IonToolbar>
        <IonText>
            <p>
                With the sliders you can indicate on a scale from 1 to 10 how do you feel <i>after</i> the dinner and
                how fatty was your meal.
            </p>
        </IonText>

    </IonContent>
);

export default DinnerDetailsPopup;