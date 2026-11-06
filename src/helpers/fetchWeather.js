import axios from 'axios';

async function fetchWeather(latitude, longitude) {
    const result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`);
    return {
        temperature: result.data.current.temperature_2m,
        windSpeed: result.data.current.wind_speed_10m,
    };
}

export default fetchWeather;