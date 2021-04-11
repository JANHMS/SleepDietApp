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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <HomeTab />
          </Route>
          <Route exact path="/food/upload">
            <UploadCSV />
          </Route>
          <Route exact path="/food">
            <AddFoodTab />
          </Route>
          <Route path="/analytics">
            <AnalyticsTab />
          </Route>
          <Route path="/my_sleep_data">
            <MySleepDataTab />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="food" href="/food">
            <IonIcon icon={pizzaSharp} />
            <IonLabel>Add food</IonLabel>
          </IonTabButton>
          <IonTabButton tab="analytics" href="/analytics">
            <IonIcon icon={analyticsSharp} />
            <IonLabel>Analytics</IonLabel>
          </IonTabButton>
          <IonTabButton tab="my_sleep_data" href="/my_sleep_data">
            <IonIcon icon={moonSharp} />
            <IonLabel>My sleep data</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
