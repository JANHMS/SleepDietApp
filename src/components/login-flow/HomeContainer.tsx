import { IonContent, IonLoading, IonInput, IonIcon, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonFab, IonFabButton, IonText } from '@ionic/react';
import React from 'react';
import './HomeContainer.css';
import ToggleBar from '../ToggleBar';
import DonoutChartContainer from '../../charts/DonoutChartContainer';
import HeaderBar from "./HeaderImage";
import cat from '../../images/cat.png';

interface Props {
  // logout: any;
  // loadingLogout: boolean;
  // user: any;
  sleep: any;
  food: any;
  DinnerTime: string;
}

const HomeContainer: React.FC<Props> = ({ 
  // loadingLogout,
  // user,
  food,
  sleep,
  DinnerTime
 }) => {
    return (
      <div className="container">
          <IonText
            style={{fontSize: "10px", color: "white", postion: "absolue", marginLeft: "2%" }}
            > Hi user here is your data. 
          </IonText>
          <div style={{
            position: "absolute",
            marginTop: "2%",
            fontWeight: "bold",
            marginLeft: "5%",
          }}>
            {sleep.Start.split(' ')[1]}
          <br/>
            Sleep Started
          </div>

          <div style={{
            position: "absolute",
            marginTop: "2%",
            marginLeft: "65%",
            fontWeight: "bold",
          }}>
            {sleep.Wake_up_hour}
          <br/>
            Wake up hour
          </div>
        
        
          <div style={{
            position: "absolute",
            marginTop: "5%",
            marginLeft: "39%",
            textAlign: "center",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "80px"
          }}>
            <img src={cat}/>
            </div>
          
  
          <div style={{
            position: "absolute",
            marginTop: "20%",
            marginLeft: "65%",
          }}>
          <div style={{fontWeight: "bold"}}>
            {food.Category[0]} <br/>
            {food.Category[1]}
          </div>
          <br/>
            Food Category
        </div>
          
          <div style={{
            position: "absolute",
            marginTop: "20%",
            marginLeft: "5%",
          }}>
          <div style={{fontWeight: "bold"}}>
            {DinnerTime}<br/>
          </div>
          <br/>
          <br/>
            Dinner Time
        </div>

          <div style={{
              position: "relative",
              marginTop: "35%",
            }}>
              <DonoutChartContainer score={parseInt(sleep.Sleep_quality)}/>
            </div>
            
            <div style={{
              position: "absolute",
              marginTop: "0%",
              marginLeft: "65%",
            }}>
            <div style={{fontWeight: "bold"}}>

              {sleep.Time_asleep}
            </div>
            <br/>
              Sleep Duration
          </div>
          
          
          <div style={{
            position: "absolute",
            marginTop: "0%",
            marginLeft: "5%",
          }}>  <div style={{fontWeight: "bold"}}>
            
            {sleep.Movements_per_hour}
          </div>
          <br/>
            Movements per hour
        </div>
        
            <div style={{
              position: "absolute",
              marginTop: "22%",
              marginLeft: "5%",
            }}>
            <div style={{fontWeight: "bold"}}>
                {sleep.Regularity}
              </div>
            <br/>
              Regularity
          </div>
      
          <div style={{
            position: "absolute",
            marginTop: "22%",
            marginLeft: "65%",
          }}>
          <div style={{fontWeight: "bold"}}>
            {sleep.Time_in_bed}
          </div>
          
          <br/>
            Time in bed
        </div>
    
        <div style={{
          position: "absolute",
          marginTop: "40%",
          marginLeft: "35%",
        }}>
          <IonButton href="/my/food">Add Food</IonButton>
      </div>
    
      <ToggleBar/>
    </div>
  );
};

export default HomeContainer;

