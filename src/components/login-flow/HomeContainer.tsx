import {IonButton, IonTitle, IonText, IonIcon} from '@ionic/react';
import React from 'react';
import './HomeContainer.css';
import DonutChartContainer from '../../charts/DonutChartContainer';
import cat from '../../images/cat.png';
import moment from "moment/moment";
import {logOutOutline} from "ionicons/icons";

interface Props {
    logout: () => void,
    sleep: any;
    food: any;
    DinnerTime: string;
}

const HomeContainer: React.FC<Props> = ({
                                            logout,
                                            food,
                                            sleep,
                                            DinnerTime
                                        }) => {
    return (
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
        </div>
    );
};

export default HomeContainer;

