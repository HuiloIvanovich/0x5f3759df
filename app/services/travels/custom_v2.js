const axios = require('axios');
const flightRequests = require('../../requests/flights');
const hotelRequests = require('../../requests/hotels');

async function getHotelsForFlight(flight) {
    let dateTo = flight.departure_at;
    dateTo = dateTo.slice(0 ,10);
    let dateFrom = flight.return_at;
    dateFrom = dateFrom.slice(0, 10);
    const hotels = hotelRequests.getHotelByDate(dateTo, dateFrom, flight.destination);
    return hotels;

}

async function getCustom (origin = "MOW", destination = null, budgetMin = 0, budgetMax = 100000000, dateFrom, dateTo, visas = [], airlines = [], currency = "RUB") {

    dateTo = dateTo.slice(0 ,10);
    dateFrom = dateFrom.slice(0 ,10);
    if(destination === null) {
        const popularFlights = await flightRequests.getPopularFlights("MOW", currency);
        let data = [];
        for(let flight in popularFlights.data) {
            const hotels = await getHotelsForFlight(popularFlights.data[flight]);
            data.push({flight: popularFlights.data[flight], hotels: hotels});
        }
        console.log(data);
        return data;
    }
    else {
        const flights = await flightRequests.getFlightByDate(dateTo, dateFrom, origin, destination);
        let data = [];
        for(let flight in flights.data) {
            const hotels = await getHotelsForFlight(flights.data[flight]);
            data.push({flight: flights.data[flight], hotels: hotels});
        }
        console.log(data);
        return data;
    }
}

module.exports = {getCustom};