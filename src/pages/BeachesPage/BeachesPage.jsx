import React from 'react';
import { Link } from 'react-router-dom';
import useBeaches from '../../hooks/useBeaches/useBeaches.jsx';

function BeachesPage() {
    const { beaches, loading, error } = useBeaches();

    return (
        <>
            <h1>Beaches</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {beaches.map((beach) => (
                    <li key={beach.id}>{beach.name}</li>
                ))}
            </ul>
            <p>Back to the <Link to="/">Homepage</Link></p>
        </>
    );
}

export default BeachesPage;