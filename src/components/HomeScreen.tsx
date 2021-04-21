import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonRow, IonCol, IonIcon, IonText } from '@ionic/react';
import React, { useState, useEffect } from "react";
import { shieldCheckmarkOutline, person } from "ionicons/icons";
import HeaderImage from '../components/HeaderImage';
import rommmeimage from'../images/roomme.png';

const Homescreen: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton routerLink="/login" style={{
            position: "absolute",
            width: "30vw", 
            fontSize:"15", 
            height:"40px",
            top: "2.5px",
            right: "20px"
          }}>Sign in</IonButton>
          <HeaderImage />
        </IonToolbar>
      </IonHeader>
      <br/>
      <IonContent className="icon-padding">
        <IonTitle>   
          <h2>You're about to <br/> find Sleepathy</h2>
        <br/>
        <h5>Find your your diets impact on your sleep. How is that <br /> for a change?</h5>
      </IonTitle>
    <br/>
    <br/>
    <br/>
    <br/>
    <div style={{left: "70px", top:"50%"}}>
        <div><IonIcon icon={shieldCheckmarkOutline}/>Sleep the night through</div>
      <br/>
        <div><IonIcon icon={shieldCheckmarkOutline}/>Wake up more energized</div>
      <br/>
        <div><IonIcon icon={shieldCheckmarkOutline}/>Create positive habits</div>
      <br/>
    </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonTitle>
            
            <IonRow class="ion-align-items-center">
              <IonCol size="12" class="ion-text-center">
                <IonButton routerLink="/register">
                  Want to improve your sleep? Join Sleepathy 
                </IonButton>
              </IonCol>
            </IonRow>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Homescreen;
