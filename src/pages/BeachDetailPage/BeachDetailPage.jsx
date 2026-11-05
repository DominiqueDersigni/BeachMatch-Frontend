import './BeachDetailPage.css';
import axios from "axios";
import React, { useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import useBeach from '../../hooks/useBeach/useBeach.jsx';
import Button from '../../components/Button/Button.jsx';
import ReviewCard from "../../components/ReviewCard/ReviewCard.jsx";
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import featureIcon from "../../assets/featureIcon.svg";
import profileIcon from "../../assets/profileIcon.svg";
import reviewIcon from "../../assets/reviewIcon.svg";
import carIcon from "../../assets/carIcon.svg";
import sunIcon from "../../assets/sunIcon.svg";
import beachPlaceholder from "../../assets/beachPlaceholder.svg";

function BeachDetailPage() {
    const {id} = useParams();
    const { beach, loading, error } = useBeach(id);
    const [photoError, setPhotoError] = useState(false);

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
            <div className = "beach-detail-page">
            {beach && <h1>{beach.name}</h1>}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="beach-photo-download-button">
                <img onError={() => setPhotoError (true)} src={photoError ? beachPlaceholder : `http://localhost:8080/beaches/${id}/photo`} alt="Beach photo" />
                <Button onClick={handleDownload}>Download picture</Button>
            </div>
            <section className="beach-info">
                {beach && <InfoCard title="Weather" icon={sunIcon} informationText={"coming soon"} />}
                {beach && <InfoCard title="Traffic" icon={carIcon} informationText={"coming soon"} />}
                {beach && <InfoCard title="Features" icon={featureIcon} informationText={beach.beachFeatures.map((feature) => feature.name).join(', ')} />}
            </section>
            <section className="beach-reviews">
                <div className = "review-header">
                    <img src={reviewIcon} alt=""/>
                    <h3>Reviews</h3>
                </div>
                <div className="beach-reviews-list">
                    {beach && beach.review.map((review) => (
                        <ReviewCard
                            key={review.id}
                            userName={review.userName}
                            createDate={review.createDate}
                            title={review.title}
                            text={review.text}
                            score={review.score}
                        />
                    ))}
                </div>
            </section>
            </div>
        </>
    );
}

export default BeachDetailPage;