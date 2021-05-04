import React, {useState} from 'react';
import {Redirect} from 'react-router';
import {useAuthInit} from '../auth';
import LoginForm from '../components/login-flow/LoginForm';
import {auth} from '../firebase';
import {useHistory} from "react-router-dom";
import {useIonToast} from "@ionic/react";

const LoginPage: React.FC = () => {
    const authObj = useAuthInit();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({loading: false, error: false});
    const [present, dismiss] = useIonToast();
    const history = useHistory();
    const handleLogin = async () => {
        try {
            setStatus({loading: true, error: false});
            const credential = await auth.signInWithEmailAndPassword(email, password);
            console.log('credential:', credential);
            // toast("Logged in")
            history.push("/home")
            setStatus({loading: false, error: false});
        } catch (error) {
            setStatus({loading: false, error: true});
            console.log('error:', error);
            present({
                buttons: [{text: 'OK', handler: () => dismiss()}],
                message: 'Invalid credentials',
                duration: 2500,
                color: "danger"
            })
        }
    };

    if (authObj.auth?.loggedIn) {
        return <Redirect to="/home"/>;
    }
    return (
        <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            status={status}
            handleLogin={handleLogin}
            auth={auth}
        />
    );
};

export default LoginPage;
