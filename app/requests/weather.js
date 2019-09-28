const axios = require("axios")
const config = require("config")
config.get("opencage")
//https://rapidapi.com/iddogino/api/global-weather-history

function getWeatherByDate(date, latitude, longitude) {
    return new Promise((resolve, reject) => {
        axios.get(`https://iddogino-global-weather-history-v1.p.rapidapi.com/weather&date=${date}&latitude=${latitude}&longitude=${longitude}`, {
            headers: {
                "x-rapidapi-host": "iddogino-global-weather-history-v1.p.rapidapi.com",
                "x-rapidapi-key": "35bbcc1db8mshacb3cbb92f34eeap1dc3ffjsn4c55ea8621e3"
            }
        })
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
}

module.exports = {
    getWeatherByDate
}
