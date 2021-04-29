import { IonButton} from '@ionic/react';
import React from 'react';
import './MySleepDataContainer.css';

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
            <br/>
            <IonButton onClick={handleAddDataClick}>Choose CSV</IonButton>
        </div>
    );
};

export default MySleepDataContainer;
