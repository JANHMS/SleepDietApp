import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonLabel,
    IonIcon,
    IonTabButton,
} from '@ionic/react';
import {analyticsSharp, home, moonSharp, pizzaSharp} from "ionicons/icons"
import {IonReactRouter} from '@ionic/react-router';
import HomeTab from './pages/HomeTab';
import AddFoodTab from './pages/AddFoodTab';
import AnalyticsTab from './pages/AnalyticsTab';
import MySleepDataTab from "./pages/MySleepDataTab";
import UploadCSV from './pages/UploadCSV';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import IntroPage from './components/login-flow/IntroPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {useAuthInit} from "./auth";

interface Props {
    redirectPath: string,
    loggedIn: boolean;
}

const AppRouterOutlet = ({redirectPath, loggedIn}: Props) => {
    return <>
        <Route path="/intro" component={IntroPage} exact/>
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/register" component={RegisterPage} exact/>
        <Route exact path="/home">
            <HomeTab/>
        </Route>
        <Route exact path="/sleep/upload">
            <UploadCSV/>
        </Route>
        <Route exact path="/food">
            <AddFoodTab/>
        </Route>
        <Route path="/analytics">
            <AnalyticsTab/>
        </Route>
        <Route path="/my_sleep_data">
            <MySleepDataTab/>
        </Route>
        <Route exact path="/">
            <Redirect to={redirectPath}/>
        </Route>
        {loggedIn && (
            <Route exact path="/intro">
                <Redirect to="/home"/>
            </Route>
        )}
    </>;
}

const App: React.FC = () => {
    const auth = useAuthInit();
    return (
        <IonApp>
            <IonReactRouter>
                {!auth.loading && auth.auth?.loggedIn && (
                    <IonTabs>
                        <IonRouterOutlet>
                            <AppRouterOutlet redirectPath='/home' loggedIn={auth.auth?.loggedIn}/>
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="home" href="/home">
                                <IonIcon icon={home}/>
                                <IonLabel>Home</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="food" href="/food">
                                <IonIcon icon={pizzaSharp}/>
                                <IonLabel>Add food</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="analytics" href="/analytics">
                                <IonIcon icon={analyticsSharp}/>
                                <IonLabel>Analytics</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="my_sleep_data" href="/my_sleep_data">
                                <IonIcon icon={moonSharp}/>
                                <IonLabel>My sleep data</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                )}
                {auth.auth?.loggedIn === false && (
                    <IonRouterOutlet>
                        <AppRouterOutlet redirectPath="/intro" loggedIn={auth.auth?.loggedIn}/>
                    </IonRouterOutlet>
                )}
            </IonReactRouter>
        </IonApp>
    )
};

export default App;
