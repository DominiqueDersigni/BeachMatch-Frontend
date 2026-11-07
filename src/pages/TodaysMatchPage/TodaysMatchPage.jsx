import './TodaysMatchPage.css';
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import useBeaches from "../../hooks/useBeaches/useBeaches.js";
import useTodaysMatch from "../../hooks/useTodaysMatch/useTodaysMatch.js";
import InfoCard from "../../components/InfoCard/InfoCard.jsx";
import sunIcon from "../../assets/sunIcon.svg";
import carIcon from "../../assets/carIcon.svg";
import Button from "../../components/Button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";


function TodaysMatchPage() {
    const { isAuth } = useContext(AuthContext);
    const {beaches} = useBeaches();
    const {match, loading, error} = useTodaysMatch(beaches);
    console.log(match);

    let trafficText = "";
    if (match) {
        if (match.traffic < 0.2) {
            trafficText = "It's quiet today";
        } else if (match.traffic< 0.5) {
            trafficText = "It's a little bit busy today";
        } else {
            trafficText = "It’s very busy today";
        }
    }

    return (
        <>
            <section>
                <div className = "todaysmatch-header">
                    {match && <h1 className = "hero-title">Today's Match: <span className = "title-highlight">{match.beach.name}</span></h1>}
                    {!isAuth && <p>Log in to find your match. <Link to="/login">Log in</Link></p>}
                    {isAuth && loading && <p>Finding your perfect match...</p>}
                    {isAuth && !loading && !match && <p>You don't have any favorite beaches yet. <Link to="/beaches">Find your beach</Link> and tap the heart to add it to your favorites.</p>}
                    {error && <p>{error}</p>}
                    {match && <p className ="todaysmatch-subtitle">Best choice today based on live weather and traffic information.</p>}
                </div>
            </section>
            <section className="todaysmatch-info">
                {match && <InfoCard title="Weather" icon={sunIcon} informationText={`Temperature: ${Math.round(match.weather.temperature)} °C, Wind: ${Math.round(match.weather.windSpeed)} km/h`} />}
                {match && <InfoCard title="Traffic" icon={carIcon} informationText={trafficText}/>}
               </section>
            <section>
                <div className="todaysmatch-button">
                {match && <Link to={`/beaches/${match.beach.id}`}><Button>Check beach details</Button></Link>}
                </div>
            </section>
        </>
    );
}

export default TodaysMatchPage;