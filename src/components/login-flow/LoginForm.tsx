import {
    IonContent,
    IonLoading,
    IonInput,
    IonButton,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonTitle,
} from '@ionic/react';
import React from 'react';
import "./LoginForm.css"

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
    return (
        <IonPage className="introPage">
            <IonContent className="pageContent">
                <IonTitle className="title">
                    Sleepathy
                </IonTitle>
                <IonText className="subtitle">
                    <h1>Login</h1>
                </IonText>
                <IonList className="inputList">
                    <IonItem>
                        <IonLabel position="floating">E-mail</IonLabel>
                        {/*Fixed error: Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'*/}
                        {/*Add "!" and convince TS that the value won't be null or undefined*/}
                        <IonInput type="email"
                                  value={email}
                                  // color={status.error && "danger"}
                                  onIonChange={(event) => setEmail(event.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        {/*Same as above*/}
                        <IonInput type="password"
                                  value={password}
                                  // color={status.error && "danger"}
                                  onIonChange={(event) => setPassword(event.detail.value!)}
                        />
                    </IonItem>
                </IonList>
                <div className="buttonContainer">
                    <IonButton
                        fill="solid"
                        // size="small"
                        className="btnLogin"
                        onClick={handleLogin}>
                        Login
                    </IonButton>
                    <div className="signUpContainer">
                        <IonText className="doNotHaveAccountText">
                            <p>Don't have an account?</p>
                        </IonText>
                        <IonButton
                            fill="clear"
                            size="small"
                            routerLink="/register">
                            Register
                        </IonButton>
                    </div>
                </div>
                <IonLoading isOpen={status.loading}/>
            </IonContent>
        </IonPage>
    )
}

export default LoginForm;