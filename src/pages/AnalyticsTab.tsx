import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AnalyticsTab.css';
import AnalyticsContainer from "../components/AnalyticsContainer";
import CreateSleepBarCharts from "../charts/CreateSleepBarCharts";

const AnalyticsTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Analytics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Analytics</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AnalyticsContainer name="Analytics page" />
        <CreateSleepBarCharts />
      </IonContent>
    </IonPage>
  );
};

export default AnalyticsTab;
