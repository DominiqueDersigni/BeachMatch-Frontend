import React, {useContext} from "react";
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
                </>
            ) : (
                <p>You don't have access to this page</p>
            )}
            </>
    )
}
export default AdminPage;