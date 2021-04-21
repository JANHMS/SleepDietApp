import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './HomeTab.css';
import HomeContainer from "../components/HomeContainer";
import React from 'react';
import ToggleBar from '../components/ToggleBar';

const HomeTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HomeContainer name="Home page" />
      </IonContent>
      <ToggleBar/>
    </IonPage>
  );
};

export default HomeTab;
