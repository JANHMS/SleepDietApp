import { IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './HomeTab.css';
import HomeContainer from "../components/HomeContainer";
import ToggleBar from '../components/ToggleBar';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { auth } from '../firebase';
import { useHistory } from "react-router";
import { toast } from '../toast';


const HomeTab: React.FC = () => {
  const history = useHistory()

// const { userId } = useAuth();
const userId = "1";

const [loadingLogout, setLoadingLogout] = useState(false)
const [loading, setLoading] = useState(true)
const [sleep, setSleep] = useState<any>();
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
      .orderBy("Start", "desc")
      .get()
      .then(doc => {
        const sleepData = doc.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setSleep(sleepData[1])
        console.log(userId)
        })
      )
    }
  )
  sleepPromise.then(() => {
    setLoading(false)
    console.log(sleep)
  })
  
},[])

  async function logout() {
  history.push('/')
  
  setLoadingLogout(true)
  toast("Logged out")
  setLoadingLogout(false)
  auth.signOut()
}


  return (
    sleep && !loading ? 
    <HomeContainer logout={logout} sleep={sleep}/>
    : <IonLoading isOpen={loading}/>
  );
};

export default HomeTab;
