import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useUser  = (username) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        async function fetchUser() {
            try {
                const response = await axios.get(`http://localhost:8080/users/${username}`, { headers: { Authorization: `Bearer ${token}` }});
                setProfile(response.data);
            } catch (e) {
                console.error(e);
                setError('Could not load user');
            } finally {
                setLoading (false);
            }
        }
        void fetchUser();
    }, [username]);

    return { profile, loading, error };
};

export default useUser;