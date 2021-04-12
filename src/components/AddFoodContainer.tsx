import { IonButton } from '@ionic/react';
import React from 'react';
import './AddFoodContainer.css';

interface ContainerProps {
    name: string;
    handleAddDataClick: () => void;
}

const AddFoodContainer: React.FC<ContainerProps> = ({ 
  name,
  handleAddDataClick
}) => {
    return (
        <div className="container">
            <strong>{name}</strong>
            <p>Add food container</p>
            <IonButton onClick={handleAddDataClick}>Add Data</IonButton>
        </div>
    );
};

export default AddFoodContainer;
