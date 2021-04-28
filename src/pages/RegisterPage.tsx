import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router';
import {useAuth} from '../auth';
import RegisterForm from '../components/login-flow/RegisterForm';
import {toast} from '../toast';
import {register} from "../api/auth";
import {useIonToast} from "@ionic/react";

const RegisterPage: React.FC = () => {
    const history = useHistory();
    const {loggedIn} = useAuth();
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState('');

    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [status, setStatus] = useState({loading: false, error: false});
    const [present, dismiss] = useIonToast();

    const handleRegister = async () => {
        if (password === cpassword) {
            try {
                setStatus({loading: true, error: false});
                register({email, password, fullName, avatar})
                    .then(
                        () => history.push('/my/home'),
                        () => present({
                            buttons: [{text: 'OK', handler: () => dismiss()}],
                            message: 'Registration failed',
                            duration: 2500,
                            color: "danger"
                        })
                    )
            } catch (error) {
                setStatus({loading: false, error: true});
                console.log('error:', error);
                present({
                    buttons: [{text: 'OK', handler: () => dismiss()}],
                    message: 'Registration failed',
                    duration: 2500,
                    color: "danger"
                })
            }
        } else {
            present({
                buttons: [{text: 'OK', handler: () => dismiss()}],
                message: 'Passwords do not match',
                duration: 2500,
                color: "danger"
            })
        }
        setStatus({loading: false, error: false})
    };

    if (loggedIn) {
        return <Redirect to="/my/home"/>;
    }
    return (
        <RegisterForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            cpassword={cpassword}
            setCPassword={setCPassword}
            status={status}
            handleRegister={handleRegister}
            avatar={avatar}
            setAvatar={setAvatar}
            fullName={fullName}
            setFullName={setFullName}
        />
    );
};

export default RegisterPage;
