const axios = require("axios")


function getCoordsByCity(city = "Lipetsk", country = "Russia") {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}+${country}&key=bedcad7e1603478fac5de1f7215b235a&pretty=1`)
        .then(response => resolve(response.results.geometry))
        .catch(err => reject(err))
        //returns {lat, lng}
    })
}

module.exports = {
    getCoordsByCity
}