import React from 'react';
import './HomeContainer.css';
import ToggleBar from './ToggleBar';

interface ContainerProps {
    name: string;
}

const HomeContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <strong>{name}</strong>
            <p>Home Container</p>
            <ToggleBar/>
        </div>
    );
};

export default HomeContainer;
