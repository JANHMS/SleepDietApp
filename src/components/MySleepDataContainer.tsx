import './MySleepDataContainer.css';

interface ContainerProps {
    name: string;
}

const MySleepDataContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <strong>{name}</strong>
            <p>My Sleep Data Container</p>
        </div>
    );
};

export default MySleepDataContainer;
