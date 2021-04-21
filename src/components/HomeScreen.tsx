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
    
      <IonTitle style={{
        position: "absolute",
        marginTop: "-300px"
      }}>   
        <br/>
        <br/>
        <br/>
        <br/>
        <h5>Find your your impact <br /> on your sleep. <br /> <br />How is that for change?</h5>
    </IonTitle>
    
    <h5 style={{
      position:"fixed",
      marginTop: "250px",
      marginLeft:"80px",
      color:"darkblue"
    }}><IonIcon icon={shieldCheckmarkOutline}/>  Sleep the night through</h5>
      <br/>
      <br/>
      <h5 style={{
      position:"fixed",
      marginTop: "270px",
      marginLeft:"80px",
      color:"darkblue"
    }}><IonIcon icon={shieldCheckmarkOutline}/>  Wake up more energized</h5>
      <br/>
      <br/>
    <h5 style={{
      position:"fixed",
      marginTop: "290px",
      marginLeft:"80px",
      color:"darkblue"
    }}><IonIcon icon={shieldCheckmarkOutline}/>  Create positive habits</h5>
      
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonTitle>
            
            <IonRow class="ion-align-items-center">
              <IonCol size="12" class="ion-text-center">
                <IonButton routerLink="/register">
                  Join Sleepathy 
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
