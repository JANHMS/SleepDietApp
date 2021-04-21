import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './AddFoodTab.css';
import AddFoodContainer from "../components/AddFoodContainer";
import { useHistory } from 'react-router-dom';
import React from 'react';
import ToggleBar from '../components/ToggleBar';

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
        <AddFoodContainer 
          name="Add food page" 
        />
      </IonContent>
      <ToggleBar/>
    </IonPage>
  );
};

export default AddFoodTab;
