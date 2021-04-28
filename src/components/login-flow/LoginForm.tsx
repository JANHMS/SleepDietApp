import { IonContent, IonLoading, IonInput, IonButton, IonHeader, IonPage, IonToolbar, IonList, IonItem, IonLabel, IonText } from '@ionic/react';
import React from 'react';
import HeaderImage from './HeaderImage';

interface Props {
  email: string;
  setEmail: (x: string) => void;
  password: string;
  setPassword: (x: string) => void;
  status: any;
  handleLogin: any;
  auth: any;
}

const LoginForm: React.FC<Props> = ({
  email,
  setEmail,
  password,
  setPassword,
  status,
  handleLogin,
  auth
}) => {
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <HeaderImage />
        </IonToolbar>
      </IonHeader>
      <h2>Login</h2>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            {/*Fix error: Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'*/}
            {/*Add "!" and convince TS that the value won't be null or undefined*/}
            <IonInput type="email" value={email}
              onIonChange={(event) => setEmail(event.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            {/*Same as above*/}
            <IonInput type="password" value={password}
              onIonChange={(event) => setPassword(event.detail.value!)}
            />
          </IonItem>
        </IonList>
        {status.error &&
          <IonText color="danger">Invalid credentials</IonText>
        }
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
        <IonButton expand="block" fill="clear" routerLink="/register">
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  )
}

export default LoginForm;