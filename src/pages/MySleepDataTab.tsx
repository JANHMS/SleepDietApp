import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './MySleepDataTab.css';
import MySleepDataContainer from "../components/MySleepDataContainer";

const MySleepDataTab: React.FC = () => {
    const history = useHistory();
    const handleAddDataClick  = () => {
          history.push("/food/upload")
    }

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
                <MySleepDataContainer 
                  name="My sleep data page"           
                  handleAddDataClick={handleAddDataClick}/>
            </IonContent>
        </IonPage>
    );
};

export default MySleepDataTab;
