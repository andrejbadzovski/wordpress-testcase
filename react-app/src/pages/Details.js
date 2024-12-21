import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Details for ID: {id}</h1>
        </div>
    );
};

export default Details;
