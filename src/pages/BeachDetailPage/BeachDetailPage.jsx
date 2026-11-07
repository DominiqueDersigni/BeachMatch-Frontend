import './BeachDetailPage.css';
import axios from "axios";
import React, {useContext, useState} from 'react';
import { Link, useParams} from 'react-router-dom';
import useBeach from '../../hooks/useBeach/useBeach.js';
import Button from '../../components/Button/Button.jsx';
import ReviewCard from "../../components/ReviewCard/ReviewCard.jsx";
import InfoCard from '../../components/InfoCard/InfoCard.jsx';
import featureIcon from "../../assets/featureIcon.svg";
import reviewIcon from "../../assets/reviewIcon.svg";
import carIcon from "../../assets/carIcon.svg";
import sunIcon from "../../assets/sunIcon.svg";
import beachPlaceholder from "../../assets/beachPlaceholder.svg";
import {AuthContext} from "../../context/AuthContext.jsx";

function BeachDetailPage() {
    const {id} = useParams();
    const { beach, setBeach, loading, error } = useBeach(id);
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

    const { isAuth } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [score, setScore] = useState("5");
    const [text, setText] = useState("");

   async  function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try { const result = await axios.post(`http://localhost:8080/reviews`, {title: title, score: Number(score), text: text, beachId: Number(id)}, { headers: { Authorization: `Bearer ${token}` } });
            setBeach({ ...beach, review: [...beach.review, result.data] });
            console.log(result.data)
            setTitle("");
            setScore("5");
            setText("");
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
                <Button variant="secondary" onClick={handleDownload}>Download picture</Button>
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
            {isAuth && <section className="write-review-section">
                <h2>Write a review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="review-form-title-score">
                        <div className="review-form-title">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                        <div className="review-form-score">
                            <label htmlFor="score">Score</label>
                            <select id="score" name="score" value={score} onChange={(e) => setScore(e.target.value)} required>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <div className="review-form-text">
                        <label htmlFor="text">Review</label>
                        <p className="review-form-hint">(max 255 characters)</p>
                        <textarea id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} required maxLength={255}></textarea>
                    </div>
                    <Button type="submit">Post review</Button>
                </form>
            </section>}
        </>
    );
}

export default BeachDetailPage;