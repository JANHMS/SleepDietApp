import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {analyticsSharp, ellipse, home, moonSharp, pizzaSharp, square, triangle} from 'ionicons/icons';
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
import Homescreen from './components/HomeScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/screen" component={Homescreen} exact/>
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/register" component={RegisterPage} exact/>
        <Route exact path="/my/home">
          <HomeTab />
        </Route>
        <Route exact path="/my/sleep/upload">
          <UploadCSV />
        </Route>
        <Route exact path="/my/food">
          <AddFoodTab />
        </Route>
        <Route path="/my/analytics">
          <AnalyticsTab />
        </Route>
        <Route path="/my/my_sleep_data">
          <MySleepDataTab />
        </Route>
        <Route exact path="/">
          <Redirect to="/screen" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
