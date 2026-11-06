import axios from 'axios';

async function fetchTraffic(latitude, longitude) {
    const result = await axios.get(`https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${latitude},${longitude}&key=${import.meta.env.VITE_TOMTOM_API_KEY}`);
    const currentSpeed = result.data.flowSegmentData.currentSpeed;
    const freeFlowSpeed = result.data.flowSegmentData.freeFlowSpeed;
    const traffic = 1 - currentSpeed/freeFlowSpeed;


    return traffic
}

export default fetchTraffic;