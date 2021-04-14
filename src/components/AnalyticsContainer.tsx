import './AnalyticsContainer.css';
import CreateSleepBarCharts from "../charts/CreateSleepBarCharts";
import CreateFoodCharts from "../charts/CreateFoodCharts";

interface ContainerProps {
    name: string;
}

const AnalyticsContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <CreateSleepBarCharts />
            <CreateFoodCharts />
        </div>
    );
};

export default AnalyticsContainer;
