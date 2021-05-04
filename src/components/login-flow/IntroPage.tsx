import {
    IonContent,
    IonButton,
    IonText,
    IonPage,
    IonTitle,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
} from '@ionic/react';
import React from "react";
import {checkmarkOutline} from "ionicons/icons";
import "./IntroPage.css"

const IntroPage: React.FC = () => {

    return (
        <IonPage className="introPage">
            <IonContent className="pageContent">
                <IonTitle className="title">
                    Sleepathy
                </IonTitle>
                <IonText className="subtitle">
                    <h1>Outcomes</h1>
                </IonText>
                <IonList lines="none" className="outcomesList">
                    <IonItem className="listElement">
                        <IonIcon className="listItem" icon={checkmarkOutline}/>
                        <IonLabel>Sleep the night through</IonLabel>
                    </IonItem>
                    <IonItem className="listElement">
                        <IonIcon className="listItem" icon={checkmarkOutline}/>
                        <IonLabel>Wake up more energized</IonLabel>
                    </IonItem>
                    <IonItem className="listElement">
                        <IonIcon className="listItem" icon={checkmarkOutline}/>
                        <IonLabel>Create positive habits</IonLabel>
                    </IonItem>
                </IonList>
                <div className="buttonContainer">
                    <IonButton
                        fill="solid"
                        size="small"
                        className="btnSignIn"
                        routerLink="/login">
                        Sign in
                    </IonButton>
                    <div className="signUpContainer">
                        <IonText className="wantToImproveText">
                            <p>Want to improve your sleep?</p>
                        </IonText>
                        <IonButton
                            fill="clear"
                            size="small"
                            routerLink="/register">
                            Register
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default IntroPage;
