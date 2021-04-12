import './AddFoodContainer.css';
import {DateTimePicker} from "./DateTimePicker";

interface ContainerProps {
    name: string;
}

const AddFoodContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <DateTimePicker/>
        </div>
    );
};

export default AddFoodContainer;
