import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useBeaches  = () => {
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function fetchBeaches() {
        try {
            const response = await axios.get('http://localhost:8080/beaches');
            setBeaches(response.data);
        } catch (e) {
            console.error(e);
            setError('Could not load beaches');
        } finally {
            setLoading (false);
        }
    }
    void fetchBeaches();
}, []);

return { beaches, loading, error };
};

export default useBeaches;