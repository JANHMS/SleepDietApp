import {IonButton, IonTitle, IonText, IonIcon, IonLoading} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import './HomeContainer.css';
import DonutChartContainer from '../../charts/DonutChartContainer';
import cat from '../../images/cat.png';
import moment from "moment/moment";
import {logOutOutline} from "ionicons/icons";
import {useHistory} from "react-router";
import {auth, firestore} from "../../firebase";
import {Constant} from "../../consts";

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
                            // Filter for sleep which ended today, so in the morning the person can see
                            // TODO: create a sleep CSV, where the teacher can see today's sleep data (sleep which ended today)
                            // const todaySleep = sleepData.filter((sleepEntry: any) => sleepEntry.End.split(" ")[0] === moment().format(Constant.dateFormatDB));
                            // setSleep(todaySleep[0])
                            // TODO: until that, the sleep data is static (always the same)
                            setSleep(sleepData[3])
                            // console.log(userId)
                            firestore.collection("users").doc(userId).collection('food')
                                .orderBy("Date", "desc")
                                .get()
                                .then(doc => {
                                    const foodData = doc.docs.map(doc => ({id: doc.id, ...doc.data()}))
                                    // Get today's food data if any
                                    const todayFood = foodData.filter((foodEntry: any) => foodEntry.Date.split(" ")[0] === moment().format(Constant.dateFormatDB));
                                    // Get the first element because it always has only 1 element, because 1 day - > 1 food data
                                    // setFood(filtered[0])
                                    setFood(todayFood[0])
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

    return (
        <div className="homeContainer">
            {/*{loading && <IonLoading isOpen={loading}/>}*/}
            <div className="headerContainer">
                <IonIcon icon={logOutOutline} onClick={logout} className="logoutIcon"/>
                <IonTitle>{moment().format('dddd, MMMM Do')}</IonTitle>
            </div>
            <div className="sleepTimeContainer">
                <IonText className="text">
                    {sleep ?
                        moment(sleep.Start.split(' ')[1], 'HH:mm:ss').format('HH:mm')
                        :
                        "-"
                    }
                    <br/>
                    <b>Sleep started</b>
                </IonText>
                <IonText className="text">
                    {sleep ?
                        moment(sleep.End.split(' ')[1], 'HH:mm:ss').format('HH:mm')
                        :
                        "-"
                    }
                    <br/>
                    <b>Woke up at</b>
                </IonText>
                <IonText className="text">
                    {DinnerTime ?
                        moment(DinnerTime, 'HH:mm:ss').format('HH:mm')
                        :
                        "-"
                    }
                    <br/>
                    <b>Dinner time</b>
                </IonText>
            </div>
            <div className="foodDetailsContainer">
                <div className="right">
                    {food ?
                        food.Category.map((category: string, index: number) => (
                            <IonText key={category} className="categoryListElement text">
                                {category}{index !== food.Category.length - 1 ? ", " : ""}
                            </IonText>
                        ))
                        :
                        "-"
                    }
                    <br/>
                    <IonText className="text"><b>Categories</b></IonText>
                </div>
            </div>
            {sleep && (
                <div>
                    <DonutChartContainer score={parseInt(sleep.Sleep_quality)}/>
                </div>
            )}
            <div className="asleepMovementContainer">
                <IonText className="left text">
                    <IonText>
                        {sleep ?
                            moment(sleep.Time_asleep, 'HH:mm:ss').format('HH:mm')
                            :
                            "-"
                        }
                    </IonText>
                    <br/>
                    <b>Sleep duration</b>
                </IonText>
                <IonText className="right text">
                    <IonText>
                        {sleep ?
                            sleep.Movements_per_hour
                            :
                            "-"
                        }
                    </IonText>
                    <br/>
                    <b>Movements / hour</b>
                </IonText>
            </div>

            <div className="regTimeInBedContainer">
                <IonText>
                    <IonText className="left text">
                        {sleep ?
                            sleep.Regularity
                            :
                            "-"
                        }
                    </IonText>
                    <br/>
                    <IonText className="text"><b>Regularity</b></IonText>
                </IonText>
                <IonText className="right text">
                    <IonText>
                        {sleep ?
                            moment(sleep.Time_in_bed, 'HH:mm:ss').format('HH:mm')
                            :
                            "-"
                        }
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
        </div>

    );
};


export default HomeContainer;

