import React from 'react';
import { Link, useParams} from 'react-router-dom';
import useBeach from '../../hooks/useBeach/useBeach.jsx';

function BeachDetailPage() {
    const {id} = useParams();
    const { beach, loading, error } = useBeach(id);

    return (
        <>
            {beach && <h1>{beach.name}</h1>}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <img src={`http://localhost:8080/beaches/${id}/photo`} alt="Beach photo" />
        </>
    );
}

export default BeachDetailPage;