import {IonButton, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './HomeTab.css';
import HomeContainer from "../components/login-flow/HomeContainer";
import React, {useState, useEffect} from 'react';
import {firestore} from '../firebase';
import {auth} from '../firebase';
import {useHistory} from "react-router";
import {toast} from '../toast';
import {useAuthInit} from "../auth";

const HomeTab: React.FC = () => {
    const history = useHistory()
    const userId = "1";

    const [loadingLogout, setLoadingLogout] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sleep, setSleep] = useState<any>();
    const [food, setFood] = useState<any>();
    const [DinnerTime, setDinnerTime] = useState<any>();

    const [user, setUser] = useState<any>();

    useEffect(() => {
        firestore.collection("profiles").doc(userId)
            .onSnapshot(async (doc) => {
                // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                const userData = doc.data()
                await setUser(userData)
            })

        const sleepPromise = new Promise((resolve, reject) => {
                resolve(
                    firestore.collection("users").doc(userId).collection('sleep')
                        .orderBy("End", "desc")
                        .get()
                        .then(doc => {
                            const sleepData = doc.docs.map(doc => ({id: doc.id, ...doc.data()}))
                            setSleep(sleepData[1])
                            console.log(userId)
                            firestore.collection("users").doc(userId).collection('food')
                                .orderBy("Date", "desc")
                                .get()
                                .then(doc => {
                                    const foodData = doc.docs.map(doc => ({id: doc.id, ...doc.data()}))
                                    setFood(foodData[1])
                                    // console.log("This is sleep", sleep)
                                    // console.log("This is food", food)
                                })
                        })
                )
            }
        )

        sleepPromise.then(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        console.log("This is sleep", sleep)
    }, [sleep])

    useEffect(() => {
        console.log("This is food", food)
        if (food !== undefined) {
            const dinnerTime = food.Date.split(' ')[1]
            setDinnerTime(dinnerTime)
        } else return;
    }, [food])

    async function logout() {
        setLoadingLogout(true)
        await auth.signOut()
        toast("Logged out")
        setLoadingLogout(false)
        history.push('/')
    }

    return (sleep && !loading && food && DinnerTime ?
            (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Home</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonHeader collapse="condense">
                            <IonToolbar>
                                <IonTitle size="large">Home</IonTitle>
                                <IonButton
                                    onClick={logout}
                                >Logout</IonButton>
                            </IonToolbar>
                        </IonHeader>
                        <IonButton
                            onClick={logout}
                        >Logout</IonButton>
                        <HomeContainer sleep={sleep} food={food} DinnerTime={DinnerTime}/>
                    </IonContent>
                </IonPage>
            )
            :
            (
                <IonLoading isOpen={loading}/>
            )
    );
};

export default HomeTab;
