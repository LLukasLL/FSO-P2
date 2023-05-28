import axios from 'axios';

const getBaseUrl = (lat, lon) => {
    const API_key = process.env.REACT_APP_API_KEY;
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
}

const getWeather = (lat, lon) => {
    return axios
        .get(getBaseUrl(lat, lon))
        .then(response => response.data)
}

export default getWeather;
