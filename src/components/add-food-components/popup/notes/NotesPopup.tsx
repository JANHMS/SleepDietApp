import React from "react";
import {IonText, IonContent, IonTitle, IonToolbar, IonIcon} from "@ionic/react";
import "./NotesPopup.css";
import {closeCircleOutline} from "ionicons/icons";

const NotesPopup: React.FC<{
    onDismiss: () => void;
}> = ({onDismiss}) => (
    <IonContent>
        <IonToolbar>
            <IonTitle>
                <h3><b>Notes</b></h3>
            </IonTitle>
            <IonIcon className="popupClose" slot="end" icon={closeCircleOutline} onClick={() => onDismiss()}/>
        </IonToolbar>
        <IonText>
            <p>
                Here you can add any additional information or notes, which can be useful at the later analysis.
                <br/>
                <br/>
                <i>E.g: What did you eat for dinner exactly? / Have you exercised today? / You attended a party. etc.</i>
            </p>
        </IonText>

    </IonContent>
);

export default NotesPopup;