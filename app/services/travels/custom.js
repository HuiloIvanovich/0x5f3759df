const flightRequests = require("../../requests/flights")
const hotelRequests = require("../../requests/hotels")

//вы дебилы такой нэйминг делать?

async function processHotels(origin, checkIn, checkOut, currency) {
    return await getHotelsCustom(origin, checkIn, checkOut, currency)
}

function processFlights(flights, budgetMin, budgetMin) {
    let trips = new Array();

    Promise.all(flights.map
        (async (flight) => {
            hotels = await processHotels(flight.destination, flight.depart, flight.return, currency)
            for (var i = 0; i < hotels.length; i++) {
                if (hotels[i].price + flight.price < budgetMin || hotels[i].price + flight.price > budgetMax) {
                    hotels.splice(i, 1)
                }
            }
            trips.push(bind(hotels, flight))
        })
    )
    return trips
}

const flight = (origin, destination, depart, returnn, price, airline, number) => {
    return {
        "origin" : origin,
        "destination" : destination,
        "depart" : depart, 
        "return" : returnn, 
        "price" : price,
        "airline" : airline, 
        "number" : number
    }
}

const hotel = (id, place, checkIn, checkOut, price, stars) => {
    return {
        "id" : id, 
        "place" : place, 
        "checkIn" : checkIn, 
        "checkOut" : checkOut, 
        "price" : price, 
        "stars" : stars
    }
}

const bind = (hotels, flight) => {
    return {
        "flight" : flight, 
        "hotels" : hotels
    }
}

const compareDates = (dateOne, dateTwo) => {
    if (dateTwo.substring(0,4) >= dateOne.substring(0, 4) && dateOne.substring(5,7) >= dateOne.substring(5,7) && dateOne.substring(8,10) >= dateOne.substring(8,10)) return true
    return false
}

const checkTimeFrame = (flightDateTo, orderDateTo, flightDateFrom, orderDateFrom,  flightCost, budgetMax) => {
    if (!compareDates(flightDateTo, orderDateTo)) {
        return false
    }
    if (!compareDates(orderDateFrom, flightDateFrom)) {
        return false
    }
    if (flightCost > budgetMax) {
        return false
    }
    return true
}

const getFlightsCustom = (origin, budgetMax, returnn, depart, currency, airlines = []) => {
    let flights = new Array()

    return new Promise((resolve, reject) => {

        flightRequests.getPopularFlights(origin, currency)
        .then(response => {
            for (var obj in response.data.data) {
                let cur = response.data.data[obj]
                let currentFlight = flight(origin, cur.destination, cur.departure_at.substring(0, 10), cur.return_at.substring(0, 10), cur.airline, cur.flight_number)
                
                if (checkTimeFrame(currentFlight.depart, depart, currentFlight.return, returnn, currentFlight.price, budgetMax )) {
                    for (var i = 0; i < airlines.length; i++) {
                        if (airlines[i] == currentFlight.airline) {
                            flights.unshift(currentFlight);
                        } else {
                            flights.push(currentFlight)
                        }
                    }
                }
            }
            (flights.length > 0) ? resolve(flights) : reject("flights not found")
        })
        .catch(err => reject(err))
    })
}


const getHotelsCustom = (origin, checkIn, checkOut, currency) => {
    let hotels = new Array()
    return new Promise((resolve, reject) => {
        hotel.hotelRequests(checkIn, checkOut, origin, currency, limit = 50) 
        .then(response => {
            for (var obj of response.data) {
                hotels(hotel(obj.hotelId, origin, checkIn, checkOut, obj.priceAvg, stars))
        }
        })
    })
} 

async function getCustom (origin = "LED", budgetMin = "0", budgetMax = "100000000", returnn = null, depart = new Date().toJSON().slice(0,10), visas = [], airlines = [], currency = "RUB") {
        getFlightsCustom(origin, budgetMax, returnn, depart, currency, airlines)
        .then(response => {
            processFlights(response, budgetMin, budgetMin)
        .catch(err => {})
    })
}

module.exports = {
    getCustom
};