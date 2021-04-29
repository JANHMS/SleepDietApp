import {IonButton, IonTitle, IonText, IonIcon, IonLoading} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './HomeContainer.css';
import DonutChartContainer from '../../charts/DonutChartContainer';
import cat from '../../images/cat.png';
import moment from "moment/moment";
import {logOutOutline} from "ionicons/icons";
import {useHistory} from "react-router";
import {auth, firestore} from "../../firebase";

const HomeContainer: React.FC = () => {
    const history = useHistory()
    const userId = "1";

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
        await auth.signOut()
        // toast("Logged out")
        history.push('/')
    }

    return (sleep && food && DinnerTime ? (
                <div className="homeContainer">
                    <div className="headerContainer">
                        <IonIcon icon={logOutOutline} onClick={logout} className="logoutIcon"/>
                        <IonTitle>{moment().format('dddd, MMMM Do')}</IonTitle>
                    </div>
                    <div className="sleepTimeContainer">
                        <IonText className="text">
                            {moment(sleep.Start.split(' ')[1], 'HH:mm:ss').format('HH:mm')}
                            <br/>
                            <b>Sleep started</b>
                        </IonText>
                        <IonText className="text">
                            {moment(sleep.End.split(' ')[1], 'HH:mm:ss').format('HH:mm')}
                            <br/>
                            <b>Woke up at</b>
                        </IonText>
                        <IonText className="text">
                            {moment(DinnerTime, 'HH:mm:ss').format('HH:mm')}
                            <br/>
                            <b>Dinner time</b>
                        </IonText>
                    </div>
                    <div className="foodDetailsContainer">
                        <div className="right">
                            {food.Category.map((category: string, index: number) => (
                                <IonText key={category} className="categoryListElement text">
                                    {category}{index !== food.Category.length - 1 ? ", " : ""}
                                </IonText>
                            ))}
                            <br/>
                            <IonText className="text"><b>Categories</b></IonText>
                        </div>
                    </div>

                    <div>
                        <DonutChartContainer score={parseInt(sleep.Sleep_quality)}/>
                    </div>

                    <div className="asleepMovementContainer">
                        <IonText className="left text">
                            <IonText>
                                {moment(sleep.Time_asleep, 'HH:mm:ss').format('HH:mm')}
                            </IonText>
                            <br/>
                            <b>Sleep duration</b>
                        </IonText>
                        <IonText className="right text">
                            <IonText>
                                {sleep.Movements_per_hour}
                            </IonText>
                            <br/>
                            <b>Movements / hour</b>
                        </IonText>
                    </div>

                    <div className="regTimeInBedContainer">
                        <IonText>
                            <IonText className="left text">
                                {sleep.Regularity}
                            </IonText>
                            <br/>
                            <IonText className="text"><b>Regularity</b></IonText>
                        </IonText>
                        <IonText className="right text">
                            <IonText>
                                {moment(sleep.Time_in_bed, 'HH:mm:ss').format('HH:mm')}
                            </IonText>
                            <br/>
                            <b>Time in bed</b>
                        </IonText>
                    </div>
                    <IonButton href="/food" size="small" className="btnAddFood">Add Food</IonButton>

                    {/*<div style={{*/}
                    {/*    position: "absolute",*/}
                    {/*    marginTop: "5%",*/}
                    {/*    marginLeft: "39%",*/}
                    {/*    textAlign: "center",*/}
                    {/*    textOverflow: "ellipsis",*/}
                    {/*    whiteSpace: "nowrap",*/}
                    {/*    overflow: "hidden",*/}
                    {/*    width: "80px"*/}
                    {/*}}>*/}
                    {/*    <img src={cat}/>*/}
                    {/*</div>*/}
                </div>)
            :
            (
                <IonLoading isOpen={loading}/>
            )

    );
};

export default HomeContainer;

