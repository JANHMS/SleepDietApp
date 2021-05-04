import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {MouseEventHandler} from "react";
import "./RegisterForm.css"

interface Props {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    cpassword: string;
    setCPassword: (password: string) => void;
    fullName: string;
    setFullName: (name: string) => void;
    status: any;
    avatar: string;
    setAvatar: (avatar: string) => void;
    handleRegister: MouseEventHandler<HTMLIonButtonElement>;
}

const RegisterForm: React.FC<Props> = ({
                                           email,
                                           setEmail,
                                           password,
                                           setPassword,
                                           cpassword,
                                           setCPassword,
                                           status,
                                           handleRegister,
                                           fullName,
                                           setFullName,
                                           avatar,
                                           setAvatar
                                       }) => {

    return (
        <IonPage className="introPage">
            <IonContent className="pageContent">
                <IonTitle className="title">
                    Sleepathy
                </IonTitle>
                <IonText className="subtitle">
                    <h1>Register</h1>
                </IonText>
                <IonList className="inputList">
                    <IonItem>
                        <IonLabel position="floating">Full Name</IonLabel>
                        {/*Fix error: Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'*/}
                        {/*Add "!" and convince TS that the value won't be null or undefined*/}
                        <IonInput value={fullName}
                                  onIonChange={(event) => setFullName(event.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">E-mail</IonLabel>
                        {/*Same as above*/}
                        <IonInput type="email" value={email}
                                  onIonChange={(event) => setEmail(event.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        {/*Same as above*/}
                        <IonInput type="password" value={password}
                                  onIonChange={(event) => setPassword(event.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Confirm Password</IonLabel>
                        {/*Same as above*/}
                        <IonInput type="password" value={cpassword}
                                  onIonChange={(event) => setCPassword(event.detail.value!)}
                        />
                    </IonItem>
                    {/*<IonItem>*/}
                    {/*    <IonLabel position="floating">Avatar</IonLabel>*/}
                    {/*    /!*Same as above*!/*/}
                    {/*    <IonInput value={avatar}*/}
                    {/*              onIonChange={(event) => setAvatar(event.detail.value!)}*/}
                    {/*    />*/}
                    {/*</IonItem>*/}
                </IonList>
                <div className="buttonContainer">
                    <IonButton
                        fill="solid"
                        className="btnRegister"
                        onClick={handleRegister}>
                        Create Account
                    </IonButton>
                    <div className="signUpContainer">
                        <IonText className="alreadyHaveAccountText">
                            <p>Already have an account?</p>
                        </IonText>
                        <IonButton
                            fill="clear"
                            size="small"
                            routerLink="/login">
                            Login
                        </IonButton>
                    </div>
                </div>
                <IonLoading isOpen={status.loading}/>
            </IonContent>
        </IonPage>
    )
}

export default RegisterForm;

