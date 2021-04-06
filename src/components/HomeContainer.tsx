import './HomeContainer.css';

interface ContainerProps {
    name: string;
}

const HomeContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <strong>{name}</strong>
            <p>Home Container</p>
        </div>
    );
};

export default HomeContainer;
