import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext.jsx";

function ProfilePage() {
    const { user } = useContext(AuthContext);
    console.log(user);

    return (
        <>
            <h1>Profile</h1>
            {user && <p>Welcome, {user.username}</p>}
            <p>Back to the<Link to="/">Homepage</Link></p>
        </>
    );
}

export default ProfilePage;