import React from 'react';
import { Link } from 'react-router-dom';

function BeachesPage() {
    return (
        <>
            <h1>Beaches</h1>

            <p>Back to the<Link to="/">Homepage</Link></p>
        </>
    );
}

export default BeachesPage;