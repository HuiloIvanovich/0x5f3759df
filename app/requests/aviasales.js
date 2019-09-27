const { KEY } = require("../../config.js")
const axios = require("axios")

//deparute_date = YYYY-MM-DD
function getFlightByDate(departure_date = null, return_date = null, origin = null, destination = null, currency = "RUB", calendar_type = "departure_date") {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.travelpayouts.com/v1/prices/calendar?depart_date=${departure_date}&origin=${origin}&destination=${destination}&calendar_type=${calendar_type}&currency=${currency}&return_date=${return_date}`, {
            headers: {
                "x-access-token": "321d6a221f8926b5ec41ae89a3b2ae7b"
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