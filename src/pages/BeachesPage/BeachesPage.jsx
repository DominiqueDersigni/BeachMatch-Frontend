import React from 'react';
import { Link } from 'react-router-dom';
import useBeaches from '../../hooks/useBeaches/useBeaches.jsx';
import BeachCard from '../../components/BeachCard/BeachCard.jsx';

function BeachesPage() {
    const {beaches, loading, error} = useBeaches();

    return (
        <>
            <h1>Beaches</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="beach-list">
                {beaches.map((beach) => (
                    <BeachCard
                        key={beach.id}
                        id={beach.id}
                        name={beach.name}
                        province={beach.province}
                        beachFeatures={beach.beachFeatures}
                        rating={beach.rating}
                    />
                ))}
            </div>
            <p>Back to the <Link to="/">Homepage</Link></p>
        </>
    );
}

export default BeachesPage;