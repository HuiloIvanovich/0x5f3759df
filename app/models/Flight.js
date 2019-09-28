const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    dateTo: {
        type: Date,
        isRequired: true
    },
    dateFrom: {
        type: Date,
        isRequired: true
    },
    cityFrom: {
        iata: {
            type: String,
            isRequired: true
        },
        name: {
            type: String,
            isRequired: true
        }
    },
    countryFrom: {
        iata: {
            type: String,
            isRequired: true
        },
        name: {
            type: String,
            isRequired: true
        }
    },
    cityTo: {
        iata: {
            type: String,
            isRequired: true
        },
        name: {
            type: String,
            isRequired: true
        }
    },
    countryTo: {
        iata: {
            type: String,
            isRequired: true
        },
        name: {
            type: String,
            isRequired: true
        }
    },
    price: {
        type: Number,
        isRequired: true
    },
    class: {
        type: String,
        isRequired: true
    },
    airline: {
        type: String,
        isRequired: true
    }
});

module.exports = Flight = mongoose.model('flight', FlightSchema);