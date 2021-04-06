import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab4.css';

const Tab4: React.FC = () => {
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
                <ExploreContainer name="My sleep data page" />
            </IonContent>
        </IonPage>
    );
};

export default Tab4;
