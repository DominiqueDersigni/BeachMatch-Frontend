import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useFavorites  = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        async function fetchFavorites() {
            try {
                const response = await axios.get(`http://localhost:8080/favorites`, { headers: { Authorization: `Bearer ${token}` } });
                setFavorites(response.data);
            } catch (e) {
                console.error(e);
                setError('Could not load favorites');
            } finally {
                setLoading (false);
            }
        }
        void fetchFavorites();
    }, []);

    return { favorites, setFavorites, loading, error };
};

export default useFavorites;


