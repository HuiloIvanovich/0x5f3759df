const axios = require("axios");
const config = require('config');
const key = config.get('opencage');

function getCoordsByCity(city = "Lipetsk", country = "Russia") {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}+${country}&key=${key}&pretty=1`)
        .then(response => resolve(response.results.geometry))
        .catch(err => reject(err))
        //returns {lat, lng}
    })
}

module.exports = {
    getCoordsByCity
};