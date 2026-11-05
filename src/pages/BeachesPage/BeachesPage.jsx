import './BeachesPage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useBeaches from '../../hooks/useBeaches/useBeaches.jsx';
import BeachCard from '../../components/BeachCard/BeachCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import map from "../../assets/map.svg";

function BeachesPage() {
    const {beaches, loading, error} = useBeaches();
    const [searchTerm, setSearchTerm] = useState('');
    const filteredBeaches = beaches.filter((beach) => beach.name.toLowerCase().includes(searchTerm.toLowerCase()) || beach.province.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className="beaches-page">
                <section className="beaches-list-section">
                    <h1>Find your beach</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    <SearchBar value={searchTerm} onSearch={setSearchTerm} />
                    <div className="beach-list">
                    {filteredBeaches.map((beach) => (
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
                </section>
                <section className="beaches-map-section">
                    <img src={map} alt="Map with pinned beaches"/>
                </section>
            </div>
            <p>Back to the <Link to="/">Homepage</Link></p>
        </>
    );
}

export default BeachesPage;