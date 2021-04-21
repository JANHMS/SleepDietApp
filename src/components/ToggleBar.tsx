import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react"
import { analyticsSharp, home, moonSharp, pizzaSharp } from "ionicons/icons"
import React from "react"


const ToggleBar = () => {
  return(
  <IonTabBar slot="bottom">
    <IonTabButton tab="home" href="/home">
      <IonIcon icon={home} />
      <IonLabel>Home</IonLabel>
    </IonTabButton>
    <IonTabButton tab="food" href="/food">
      <IonIcon icon={pizzaSharp} />
      <IonLabel>Add food</IonLabel>
    </IonTabButton>
    <IonTabButton tab="analytics" href="/analytics">
      <IonIcon icon={analyticsSharp} />
      <IonLabel>Analytics</IonLabel>
    </IonTabButton>
    <IonTabButton tab="my_sleep_data" href="/my_sleep_data">
      <IonIcon icon={moonSharp} />
      <IonLabel>My sleep data</IonLabel>
    </IonTabButton>
  </IonTabBar>
  )
}

export default ToggleBar;
