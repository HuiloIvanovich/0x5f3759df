const axios = require("axios");
const config = require('config');
const key = config.get('aviasales');


function getHotelByDate(checkIn = null, checkOut = null, location = null, currency = "rub", limit = 10) {
    return new Promise((resolve, reject) => {
        axios.get(`http://engine.hotellook.com/api/v2/cache.json?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}&limit=${limit}&token=${key}`)
        .then(response => {
            (response.length === 0) ? reject("check input") : resolve(response)
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    getHotelByDate
};