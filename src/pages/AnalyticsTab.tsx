import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './AnalyticsTab.css';
import AnalyticsContainer from "../components/AnalyticsContainer";
import React from 'react';

const AnalyticsTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Analytics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent overflow-scroll="false">
        <AnalyticsContainer name="Analytics page" />
      </IonContent>
    </IonPage>
  );
};

export default AnalyticsTab;
