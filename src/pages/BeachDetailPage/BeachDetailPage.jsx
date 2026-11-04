import React from 'react';
import { Link, useParams} from 'react-router-dom';
import useBeach from '../../hooks/useBeach/useBeach.jsx';
import Button from '../../components/Button/Button.jsx';
import axios from "axios";
import './BeachDetailPage.css';
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import featureIcon from "../../assets/featureIcon.svg";

function BeachDetailPage() {
    const {id} = useParams();
    const { beach, loading, error } = useBeach(id);

    async function handleDownload() {
        try{
            const response = await axios.get(`http://localhost:8080/beaches/${id}/photo`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${beach.name}.jpg`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {beach && <h1>{beach.name}</h1>}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <img src={`http://localhost:8080/beaches/${id}/photo`} alt="Beach photo" />

            <Button onClick={handleDownload}>Download picture</Button>

            <section className="beach-info">
            {/*{beach && <InfoCard title="Weather" informationText={...} />}*/}
            {/*{beach && <InfoCard title="Traffic" informationText={...} />}*/}
                {beach && <InfoCard title="Features" icon={featureIcon} informationText={beach.beachFeatures.map((feature) => feature.name).join(', ')} />}
            </section>
            <section className="beach-reviews">

            </section>
        </>
    );
}

export default BeachDetailPage;