import {IonContent, IonPage} from '@ionic/react';
import './HomeTab.css';
import HomeContainer from "../components/login-flow/HomeContainer";
import React from 'react';

const HomeTab: React.FC = () => {
    return (
        <IonPage>
            <IonContent overflow-scroll="false" className="homeTabContent">
                <HomeContainer/>
            </IonContent>
        </IonPage>
    )
};

export default HomeTab;
