import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import LoginForm from '../components/login-flow/LoginForm';
import { auth } from '../firebase';
import { toast } from '../toast';
import { useHistory } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });
  const history = useHistory();
  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log('credential:', credential);
      toast("Logged in")
      history.push("/my/home")
      setStatus({ loading: false, error: false });
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('error:', error);
      toast("Login failed")
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/home" />;
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
