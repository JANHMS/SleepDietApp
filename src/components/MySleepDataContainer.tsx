import { IonButton } from '@ionic/react';
import React from 'react';
import './MySleepDataContainer.css';
import ToggleBar from './ToggleBar';

interface ContainerProps {
    name: string;
    handleAddDataClick: () => void;
}

const MySleepDataContainer: React.FC<ContainerProps> = ({ 
  name,
  handleAddDataClick
 }) => {
    return (
        <div className="container">
            <strong>{name}</strong>
            <p>My Sleep Data Container</p>
            <IonButton onClick={handleAddDataClick}>Add Data</IonButton>
            <ToggleBar/>
        </div>
    );
};

export default MySleepDataContainer;
