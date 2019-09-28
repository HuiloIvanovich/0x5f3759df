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
            (response.error == null) ? resolve(response) : reject(response.error)
        })
        .catch(err => Console.log(err + " errr"))
    })
}

module.exports = {
    getFlightByDate
}