import './HomePage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import beachSmall from "../../assets/beachSmall.svg";

function HomePage() {
    return (
        <>
            <section className="upper-part-homepage">
                <div className="homepage-upper-left">
                    <h1 className="title">Which beach is best <span className="title-highlight">today?</span></h1>
                    <p>BeachMatch looks at the live weather and traffic and tells you which beach to visit right now. Save your favorites and read reviews from other beachgoers.</p>
                </div>
                <img src={beachSmall} alt="beach"/>
            </section>
            <h2 className="how-it-works-title">How it works:</h2>
            <section className="how-it-works-cards">
            <article>
                <h3>1. Create your profile</h3>
                <p>Sign up and tell us where you live and how you travel.</p>
            </article>
            <article>
                <h3>2. We check the conditions</h3>
                <p>Live temperature, wind, UV index and traffic for every beach.</p>
            </article>
            <article>
                <h3>3. Get your match</h3>
                <p>See today's best beach and save the ones you love.</p>
            </article>
            </section>
        </>
    );
}

export default HomePage;