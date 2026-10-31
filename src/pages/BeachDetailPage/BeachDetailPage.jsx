import React from 'react';
import { Link } from 'react-router-dom';

function BeachDetailPage() {
    return (
        <>
            <h1>Beach</h1>

            <p>Back to the<Link to="/">Homepage</Link></p>
        </>
    );
}

export default BeachDetailPage;