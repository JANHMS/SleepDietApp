import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './AddFoodTab.css';

const AddFoodTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add food</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Add food page" />
      </IonContent>
    </IonPage>
  );
};

export default AddFoodTab;
