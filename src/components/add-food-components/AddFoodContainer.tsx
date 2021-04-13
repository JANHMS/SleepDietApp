import './AddFoodContainer.css';
import {DateTimePicker} from "./DateTimePicker";
import {FoodCategoriesComponent} from "./FoodCategoriesComponent";
import {Category} from "./Category";

interface ContainerProps {
    name: string;
}

const AddFoodContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <DateTimePicker/>
            <FoodCategoriesComponent/>
        </div>
    );
};

export default AddFoodContainer;
