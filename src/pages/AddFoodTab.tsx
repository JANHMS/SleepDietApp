import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AddFoodTab.css';
import AddFoodContainer from "../components/add-food-components/AddFoodContainer";
import { useHistory } from 'react-router-dom';

const AddFoodTab: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent overflow-scroll="false">
        <AddFoodContainer
          name="Add food page"
        />
      </IonContent>
    </IonPage>
  );
};

export default AddFoodTab;
