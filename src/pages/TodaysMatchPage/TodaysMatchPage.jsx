import React from 'react';
import { Link } from 'react-router-dom';

function TodaysMatchPage() {
    return (
        <>
            <h1>Today's Match:</h1>

            <p>Back tot the<Link to="/">Homepage</Link></p>
        </>
    );
}

export default TodaysMatchPage;