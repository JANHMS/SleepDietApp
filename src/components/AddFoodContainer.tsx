import './AddFoodContainer.css';

interface ContainerProps {
    name: string;
}

const AddFoodContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <strong>{name}</strong>
            <p>Add food container</p>
        </div>
    );
};

export default AddFoodContainer;
