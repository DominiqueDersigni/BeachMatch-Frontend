import './BeachesPage.css';
import React, { useState } from 'react';
import axios from 'axios';
import useBeaches from '../../hooks/useBeaches/useBeaches.js';
import useFavorites from '../../hooks/useFavorites/useFavorites.js';
import BeachCard from '../../components/BeachCard/BeachCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import map from "../../assets/map.svg";


function BeachesPage() {
    const {beaches, loading, error} = useBeaches();
    const [searchTerm, setSearchTerm] = useState('');
    const filteredBeaches = beaches.filter((beach) => beach.name.toLowerCase().includes(searchTerm.toLowerCase()) || beach.province.toLowerCase().includes(searchTerm.toLowerCase()));
    const {favorites, setFavorites} = useFavorites ();

    async function handleToggleFavorite(beachId) {
        const token = localStorage.getItem('token');

        const favorite = favorites.find((favorite) => favorite.beachId === beachId);
        try{ if (favorite) {
            await axios.delete(`http://localhost:8080/favorites/${favorite.id}`, { headers: { Authorization: `Bearer ${token}` } });
            setFavorites(favorites.filter((fav) => fav.id !== favorite.id));
        } else if (!favorite) {
            const response = await axios.post(`http://localhost:8080/favorites`, {beachId : beachId}, { headers: { Authorization: `Bearer ${token}` } });
            setFavorites([...favorites, response.data]);
        }} catch (error) {
            console.log(error);
        }
    }

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
                            isFavorite={favorites.some((favorite) => favorite.beachId === beach.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                    </div>
                </section>
                <section className="beaches-map-section">
                    <img src={map} alt="Map with pinned beaches"/>
                </section>
            </div>
        </>
    );
}

export default BeachesPage;