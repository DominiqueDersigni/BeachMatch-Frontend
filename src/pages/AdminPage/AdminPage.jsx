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




    return (
        <>
            {isAdmin ? (
                <>
                    <h2>Beaches</h2>
                    <div className="beach-list">
                        {beaches.map((beach) => (
                            <div key={beach.id}>
                                <BeachCard
                                    key={beach.id}
                                    id={beach.id}
                                    name={beach.name}
                                    province={beach.province}
                                    beachFeatures={beach.beachFeatures}
                                    rating={beach.rating}
                                />
                                <Button onClick={() => handleDelete(beach.id)}>Delete</Button>
                            </div>
                        ))}
                    </div>

                    <section className="admin-add-beach-section">
                        <h2>Add a beach</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                            <label htmlFor="province">Province</label>
                            <input type="text" id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)} required/>
                            <label htmlFor="latitude">Latitude</label>
                            <input type="number" step="any" id="latitude" name="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required/>
                            <label htmlFor="longitude">Longitude</label>
                            <input type="number" step="any" id="longitude" name="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required/>
                            <label htmlFor="description">Description</label>
                                <p className="admin-form-description-hint">(max 255 characters)</p>
                                <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required maxLength={255}></textarea>
                            <Button type="submit">Add beach</Button>
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