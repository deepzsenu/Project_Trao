const axios = require("axios");

const getWeatherByCity = async (cityName) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: cityName,
                    appid: process.env.OPENWEATHER_API_KEY,
                    units: "metric"
                }
            }
        );

        const data = response.data;

        return {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            condition: data.weather[0].description,
            icon: data.weather[0].icon,
            windSpeed: data.wind.speed
        };

    } catch (error) {
        console.log("Weather API Error:");
        console.log(error.response?.data || error.message);
        return null; // if city not found
    }
};

module.exports = { getWeatherByCity };