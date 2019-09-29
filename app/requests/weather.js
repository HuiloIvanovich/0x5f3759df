const axios = require("axios")
const config = require("config")

function getWeather(city="Moscow") {
    return new Promise((resolve, reject) => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ede296c7614ce2464cdb5b6b51a3dff`)
        .then(response => {
            resolve(response)})
        .catch(err => reject(err))
    })
}

module.exports = {
    getWeather
}
