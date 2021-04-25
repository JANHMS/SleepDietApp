import { IonContent, IonLoading, IonInput, IonIcon, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonFab, IonFabButton, IonText } from '@ionic/react';
import React from 'react';
import './HomeContainer.css';
import ToggleBar from './ToggleBar';
import DonoutChartContainer from '../charts/DonoutChartContainer';
import HeaderBar from "./HeaderImage";

interface Props {
  logout: any;
  // loadingLogout: boolean;
  // user: any;
  sleep: any;
}


const HomeContainer: React.FC<Props> = ({ 
  logout,
  // loadingLogout,
  // user,
  sleep
 }) => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
            <IonButton 
              onClick={logout}
            >Logout</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Home</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonText 
            style={{fontSize: "10px", color: "darkblue", postion: "absolue", marginLeft: "2%" }}
            > Hi user here is your data. 
          </IonText>
          <div style={{
            position: "relative",
            marginTop: "300px",
          }}>
            <DonoutChartContainer score={parseInt(sleep.Sleep_quality)}/>
          </div>
        </IonContent>
        <ToggleBar/>
      </IonPage>     
    );
};

export default HomeContainer;

