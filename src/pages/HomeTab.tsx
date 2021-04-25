import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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

const { userId } = useAuth();
const [loadingLogout, setLoadingLogout] = useState(false)
const [loading, setLoading] = useState(true)
const [services, setServices] = useState<any>();
const [user, setUser] = useState<any>();

  async function logout() {
  history.push('/')
  setLoadingLogout(true)
  toast("Logged out")
  setLoadingLogout(false)
  auth.signOut()
}

  return (
    <HomeContainer logout={logout}/>
  );
};

export default HomeTab;
