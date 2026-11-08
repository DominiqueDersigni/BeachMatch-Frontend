import './ProfilePage.css';
import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext.jsx";
import useFavorites from "../../hooks/useFavorites/useFavorites.js";
import useUser from "../../hooks/useUser/useUser.js";
import profileIcon from "../../assets/profileIcon.svg";
import heartFull from "../../assets/heartFull.svg";
import Button from "../../components/Button/Button.jsx";

function ProfilePage() {
    const { user } = useContext(AuthContext);
    const {profile, setProfile} = useUser(user.username);
    const {favorites, loading, error} = useFavorites();
    console.log(user);

    const [isEditing, setIsEditing] = useState(false);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");
    const [modesOfTransport, setModesOfTransport] = useState([]);

    const transportOptions = ["WALKING", "CAR", "BIKE", "BOAT", "PUBLIC_TRANSPORT"];

    function startEditing() {
        setAddress(profile.address || "");
        setCity(profile.city || "");
        setAge(profile.age || "");
        setModesOfTransport(profile.modesOfTransport || []);
        setIsEditing(true);
    }

    function handleTransportChange(mode) {
        if (modesOfTransport.includes(mode)) {
            setModesOfTransport(modesOfTransport.filter((m) => m !== mode));
        } else {
            setModesOfTransport([...modesOfTransport, mode]);
        }
    }

    async function handleSaveProfile(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8080/users/${user.username}`,
                { address: address, city: city, age: Number(age), modesOfTransport: modesOfTransport },
                { headers: { Authorization: `Bearer ${token}` } });
            setProfile(response.data);
            setIsEditing(false);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Profile</h1>
            <section className="profile-info">
                <article className="profile-card">
                    <img src={profileIcon} alt=""/>
                    <div className="profile-card-details">
                        {profile && <h3>{profile.name}</h3>}
                            <div className="profile-card-grid">
                                {profile && <p className= "profile-age">Age: {profile.age ? `${profile.age} years old` : "Not filled in yet"}</p>}
                                {profile && <p className= "profile-address"> Address: {profile.address ? profile.address : "Not filled in yet"}</p>}
                                {profile && <p className= "profile-city"> Lives in: {profile.city ? profile.city : "Not filled in yet"}</p>}
                                {profile && <p className= "profile-email">Email: {profile.email}</p>}
                                {profile && <p className="profile-transport">Mode of transportation: {profile.modesOfTransport && profile.modesOfTransport.length > 0 ? profile.modesOfTransport.map((mode) => mode.toLowerCase().replace('_', ' ')).join(', ') : "Not filled in yet"}</p>}                            </div>
                    </div>
                </article>
                <Button onClick={startEditing}>Edit Profile</Button>
                </section>
            {isEditing && (
                <section className="edit-profile-section">
                    <h2>Edit profile</h2>
                    <form onSubmit={handleSaveProfile}>
                        <div className="edit-profile-grid">
                            <div className="edit-profile-field">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                            </div>
                            <div className="edit-profile-field">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required/>
                            </div>
                            <div className="edit-profile-field">
                                <label htmlFor="age">Age</label>
                                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required/>
                            </div>
                        </div>

                        <div className="edit-profile-field">
                            <p className="edit-profile-label">Mode of transportation</p>
                            <div className="transport-options">
                                {transportOptions.map((mode) => (
                                    <label key={mode} className="transport-option">
                                        <input type="checkbox" checked={modesOfTransport.includes(mode)} onChange={() => handleTransportChange(mode)}/>
                                        {mode.toLowerCase().replace('_', ' ')}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <Button type="submit">Save profile</Button>
                    </form>
                </section>
            )}
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