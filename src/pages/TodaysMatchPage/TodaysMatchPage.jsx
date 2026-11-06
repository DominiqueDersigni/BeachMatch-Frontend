import React from 'react';
import { Link } from 'react-router-dom';
import useBeaches from "../../hooks/useBeaches/useBeaches.js";
import useTodaysMatch from "../../hooks/useTodaysMatch/useTodaysMatch.js";

function TodaysMatchPage() {
    const {beaches} = useBeaches();
    const {match, loading, error} = useTodaysMatch(beaches);
    console.log(match);

    return (
        <>
            <h1>Today's Match:</h1>

            <p>Back tot the<Link to="/">Homepage</Link></p>
        </>
    );
}

export default TodaysMatchPage;