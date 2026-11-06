import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useBeach  = (id) => {
    const [beach, setBeach] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBeach() {
            try {
                const result = await axios.get(`http://localhost:8080/beaches/${id}`);
                setBeach(result.data);
            } catch (e) {
                console.error(e);
                setError('Could not load beach');
            } finally {
                setLoading (false);
            }
        }
        void fetchBeach();
    }, [id]);

    return { beach, loading, error };
};

export default useBeach;