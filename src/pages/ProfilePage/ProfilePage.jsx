import React from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
    return (
        <>
            <h1>Profile</h1>

            <p>Back to the<Link to="/">Homepage</Link></p>
        </>
    );
}

export default ProfilePage;