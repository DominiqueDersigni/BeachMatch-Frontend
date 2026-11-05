import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext.jsx";
import useFavorites from "../../hooks/useFavorites/useFavorites.js";
import profileIcon from "../../assets/profileIcon.svg";


function ProfilePage() {
    const { user } = useContext(AuthContext);
    const {favorites, loading, error} = useFavorites();
    console.log(user);

    return (
        <>
            <h1>Profile</h1>
            <section className="profile-info">
                <article className="profile-card">
                    <div className="profile-card-header">
                        <div className="profile-card-icon">
                            <img src={profileIcon} alt=""/>
                            <div className="profile-card-userName-date">
                                {user && <p className="profile-username">{user.firstName}</p>}
                                <p className= "profile-age"> age </p>
                                <p className= "profile-email">email</p>
                            </div>
                        </div>
                        <p className= "profile-city"> age </p>
                        <p className= "profile-transport">email</p>
                    </div>
                </article>
                <button>edit profile </button>
            </section>
            <section className="favorite-beaches">
                <h2>Favorite beaches</h2>
                <div className="favorite-beaches-list">
                    {favorites.map((favorite) => (
                    <Link key={favorite.id} to={`/beaches/${favorite.beachId}`}>
                          {favorite.beachName}</Link>))}
                </div>
            </section>
        </>
    );
}

export default ProfilePage;