import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import './MySleepDataTab.css';
import MySleepDataContainer from "../components/MySleepDataContainer";
import React, {useEffect, useState} from 'react';
import {firestore} from '../firebase';

const MySleepDataTab: React.FC = () => {
    const history = useHistory();
    const handleAddDataClick = () => {
        history.push("/sleep/upload")
    }

    const [userSleepData, setUserSleepData] = useState<any>()
    const userId = "1"

    useEffect(() => {
        firestore.collection('users')
            .doc(userId)
            .collection('sleep')
            .get()
            .then(snapshot => {
                const sleepData = snapshot.docs.map(doc => ({date: doc.id, ...doc.data()}))
                if (sleepData) {
                    setUserSleepData(sleepData)
                } else console.log("no sleepData")
            })
    }, [])

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
                  name="Import sleep data"
                  handleAddDataClick={handleAddDataClick}/>
            </IonContent>
        </IonPage>
    );
};

export default MySleepDataTab;
