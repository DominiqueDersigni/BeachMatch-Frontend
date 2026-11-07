import {useEffect, useState} from "react";
import fetchWeather from "../../helpers/fetchWeather.js";
import fetchTraffic from "../../helpers/fetchTraffic.js";
import useFavorites from "../useFavorites/useFavorites.js";

const useTodaysMatch  = (beaches) => {
    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {favorites, loading: favoritesLoading} = useFavorites();

    useEffect(() => {
        if (beaches.length === 0 || favoritesLoading) {
            return;
        }
        if (favorites.length === 0) {
            setLoading(false);
            return;
        }

        const favoriteBeaches = beaches.filter((beach) => favorites.some((favorite) => favorite.beachId === beach.id));

        async function fetchTodaysMatch() {
            let bestBeach = null;
            let bestScore = null;
            let bestWeather = null;
            let bestTraffic = null;
            try{
                for (let i = 0; i < favoriteBeaches.length; i++) {
                    const beach = favoriteBeaches[i];
                    const weather = await fetchWeather(beach.latitude, beach.longitude);

                    let traffic = 0;
                    try{
                        traffic = await fetchTraffic(beach.latitude, beach.longitude);
                    }
                    catch (e) {
                        console.log("Traffic not available");
                    }

                    const score = weather.temperature - weather.windSpeed / 5 -  traffic * 10;

                    if (bestScore === null || score > bestScore) {
                        bestScore = score;
                        bestBeach = beach;
                        bestWeather = weather;
                        bestTraffic = traffic;
                    }
                }
                setMatch({
                    beach: bestBeach,
                    weather: bestWeather,
                    traffic: bestTraffic,
                });
            } catch (e) {
                console.error(e);
                setError('Could not load match');
            } finally {
                setLoading (false);
            }
        }
        fetchTodaysMatch();
    }, [beaches, favorites, favoritesLoading]);

    return { match, loading, error };
};

export default useTodaysMatch;