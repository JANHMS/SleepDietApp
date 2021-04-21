// @ts-nocheck
import './AnalyticsContainer.css';
import CreateSleepBarCharts from "../charts/CreateSleepBarCharts";
import CreateFoodCharts from "../charts/CreateFoodCharts";

interface ContainerProps {
    name: string;
}

const AnalyticsContainer: React.FC<ContainerProps> = ({ name }) => {

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
        <div className="analyticsContainer">
            <CreateSleepBarCharts />
            <ColoredLine color="none" />
            <CreateFoodCharts />
        </div>
    );
};

export default AnalyticsContainer;
