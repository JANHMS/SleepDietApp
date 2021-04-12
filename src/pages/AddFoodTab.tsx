import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AddFoodTab.css';
import AddFoodContainer from "../components/AddFoodContainer";
import { useHistory } from 'react-router-dom';

const AddFoodTab: React.FC = () => {
  const history = useHistory();
  const handleAddDataClick  = () => {
        history.push("/food/upload")
  }
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
        <AddFoodContainer 
          name="Add food page" 
          handleAddDataClick={handleAddDataClick}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddFoodTab;
