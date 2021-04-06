import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './MySleepDataTab.css';
import MySleepDataContainer from "../components/MySleepDataContainer";

const MySleepDataTab: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My sleep data</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">My sleep data</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MySleepDataContainer name="My sleep data page" />
            </IonContent>
        </IonPage>
    );
};

export default MySleepDataTab;
