import './AdminPage.css';
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import BeachCard from "../../components/BeachCard/BeachCard.jsx";
import useBeaches from "../../hooks/useBeaches/useBeaches.js";
import axios from "axios";
import Button from "../../components/Button/Button.jsx";

function AdminPage() {
    const { user } = useContext(AuthContext);
    const isAdmin = user && user.roles.includes("ROLE_ADMIN");
    const {beaches, setBeaches} = useBeaches();


    async function handleDelete(id){
        const token = localStorage.getItem('token');
        try{
            await axios.delete(`http://localhost:8080/beaches/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setBeaches(beaches.filter((beach) => beach.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [province, setProvince] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    async  function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try { const result = await axios.post(`http://localhost:8080/beaches`, {name:name, province:province, description:description, longitude:Number(longitude), latitude:Number(latitude)}, { headers: { Authorization: `Bearer ${token}` } });
            setBeaches([ ...beaches, result.data]);
            if (photo) {
                await sendImage(result.data.id);
            }
            console.log(result.data)
            setName("");
            setProvince("");
            setDescription("");
            setLatitude("");
            setLongitude("");
        } catch (error) {
            console.log(error);
        }
    }

    const [photo, setPhoto] = useState(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        setPhoto(file);
    }

    async function sendImage(beachId) {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append("file", photo);

        try {
            await axios.post(`http://localhost:8080/beaches/${beachId}/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {isAdmin ? (
                <>
                    <h2>Beaches</h2>
                    <div className="beach-list">
                        {beaches.map((beach) => (
                            <div className="admin-beach-item" key={beach.id}>
                                <BeachCard
                                    key={beach.id}
                                    id={beach.id}
                                    name={beach.name}
                                    province={beach.province}
                                    beachFeatures={beach.beachFeatures}
                                    rating={beach.rating}
                                    showRating={false}
                                />
                                <Button onClick={() => handleDelete(beach.id)}>Delete</Button>
                            </div>
                        ))}
                    </div>

                    <section className="admin-add-beach-section">
                        <h2>Add a beach</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-form-grid">
                                <div className="admin-form-field">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" placeholder="e.g. Castricum aan Zee" value={name} onChange={(e) => setName(e.target.value)} required/>
                                </div>
                                <div className="admin-form-field">
                                    <label htmlFor="province">Province</label>
                                    <select id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)} required>
                                        <option value="">e.g. Noord-Holland</option>
                                        <option>Noord-Holland</option>
                                        <option>Zuid-Holland</option>
                                        <option>Zeeland</option>
                                        <option>Friesland</option>
                                        <option>Groningen</option>
                                        <option>Flevoland</option>
                                        <option>Gelderland</option>
                                        <option>Utrecht</option>
                                        <option>Overijssel</option>
                                        <option>Drenthe</option>
                                        <option>Noord-Brabant</option>
                                        <option>Limburg</option>
                                    </select>
                                </div>
                                <div className="admin-form-field">
                                    <label htmlFor="latitude">Latitude</label>
                                    <input type="number" step="any" id="latitude" name="latitude" placeholder="50.7 - 53.6" value={latitude} onChange={(e) => setLatitude(e.target.value)} required/>
                                </div>
                                <div className="admin-form-field">
                                    <label htmlFor="longitude">Longitude</label>
                                    <input type="number" step="any" id="longitude" name="longitude" placeholder="3.3 - 7.3" value={longitude} onChange={(e) => setLongitude(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="admin-form-field">
                                <label htmlFor="description">Description</label>
                                <p className="admin-form-description-hint">(max 255 characters)</p>
                                <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required maxLength={255}></textarea>
                            </div>

                            <div className="admin-form-field">
                                <p className="admin-form-label">Beach Photo</p>
                                <label htmlFor="beach-image" className="admin-photo-upload">
                                    <span className="admin-photo-title">Upload photo</span>
                                    <span className="admin-form-description-hint">JPG or PNG, 1 photo per beach</span>
                                    <input type="file" id="beach-image" name="image-field" accept="image/png, image/jpeg" onChange={handleImageChange}/>
                                </label>
                            </div>

                            <Button type="submit">Save beach</Button>
                        </form>
                    </section>
                </>
            ) : (
                <p>You don't have access to this page</p>
            )}
            </>
    )
}
export default AdminPage;