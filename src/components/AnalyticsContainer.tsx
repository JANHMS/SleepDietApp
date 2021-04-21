// @ts-nocheck
import './AnalyticsContainer.css';
import CreateSleepBarCharts from "../charts/CreateSleepBarCharts";
import CreateFoodCharts from "../charts/CreateFoodCharts";
import ToggleBar from './ToggleBar';
import { IonContent,IonPage  } from "@ionic/react";

interface ContainerProps {
    name: string;
}

const AnalyticsContainer: React.FC<ContainerProps> = ({ name }): JSX.Element => {

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
      );

    return (
      <div className="container">
          <CreateSleepBarCharts />
          <ColoredLine color="none" />
          <CreateFoodCharts />
      </div>
      
    );
};

export default AnalyticsContainer;
