const weatherRequest = require("../../requests/weather")

const getCurrentWeather = (city) => {
    return new Promise ((resolve, reject) => {
        weatherRequest.getWeather(city)
        .then(response => resolve(response.data.main))
        .catch(err => reject(err))
    })
}

module.exports = {
    getCurrentWeather
}
