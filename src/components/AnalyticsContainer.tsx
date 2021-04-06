import './AnalyticsContainer.css';

interface ContainerProps {
    name: string;
}

const AnalyticsContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <strong>{name}</strong>
            <p>Analytics Container</p>
        </div>
    );
};

export default AnalyticsContainer;
