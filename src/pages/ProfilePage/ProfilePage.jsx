import './ProfilePage.css';
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext.jsx";
import useFavorites from "../../hooks/useFavorites/useFavorites.js";
import useUser from "../../hooks/useUser/useUser.js";
import profileIcon from "../../assets/profileIcon.svg";
import heartFull from "../../assets/heartFull.svg";
import Button from "../../components/Button/Button.jsx";


function ProfilePage() {
    const { user } = useContext(AuthContext);
    const {profile} = useUser(user.username);
    const {favorites, loading, error} = useFavorites();
    console.log(user);

    return (
        <>
            <h1>Profile</h1>
            <section className="profile-info">
                <article className="profile-card">
                    <img src={profileIcon} alt=""/>
                    <div className="profile-card-details">
                        {profile && <h3>{profile.name}</h3>}
                            <div className="profile-card-grid">
                                {profile && <p className= "profile-age">Age: {profile.age} years old</p>}
                                {profile && <p className= "profile-city"> Lives in: {profile.city}</p>}
                                {profile && <p className= "profile-email">Email: {profile.email}</p>}
                                {profile && <p className= "profile-transport">Mode of transportation: {profile.modesOfTransport.map((mode) => mode.toLowerCase().replace('_', ' ')).join(', ')}</p>}
                            </div>
                    </div>
                </article>
                <Button variant="secondary">Edit Profile</Button>
            </section>
            <section className="favorite-beaches">
                <h2>Favorite beaches</h2>
                <div className="favorite-beaches-list">
                    {favorites.map((favorite) => (
                    <article key={favorite.id} className="favorite-card">
                        <img src={heartFull} alt=""/>
                        <h4><Link to={`/beaches/${favorite.beachId}`}>{favorite.beachName}</Link></h4>
                    </article>
                    ))}
                </div>
            </section>
        </>
    );
}

export default ProfilePage;