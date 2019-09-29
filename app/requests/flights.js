const config = require('config');
const key = config.get('aviasales');
const axios = require("axios");

//deparute_date = YYYY-MM-DD
function getFlightByDate(departure_date = null, return_date = null, origin = null, destination = null, currency = "RUB", calendar_type = "departure_date") {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.travelpayouts.com/v1/prices/calendar?depart_date=${departure_date}&origin=${origin}&destination=${destination}&calendar_type=${calendar_type}&currency=${currency}&return_date=${return_date}`, {
            headers: {
                "x-access-token": key
            }
        })
        .then(response => {
            (response.error == null) ? resolve(response.data) : reject(response.error)
        })
        .catch(err => {
            console.log(err + " errr");
            reject(err)
        })
    })
}

async function getPopularFlights(origin = null, currency = "RUB") {
        try {
            const data = await axios.get(`https://api.travelpayouts.com/v1/city-directions?origin=${origin}&currency=${currency}&token=${key}`)
            return data.data;
        } catch (err) {

        }
}

module.exports = {
    getFlightByDate, 
    getPopularFlights
};