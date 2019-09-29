const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    dateTo: {
        type: String,
        isRequired: true
    },
    dateFrom: {
        type: String,
        isRequired: true
    },
    price: {
        type: Number,
        isRequired: true
    },
    stars: {
        type: Number,
        isRequired: true
    },
    apartments: [{
        beds: [{
            bedType: {
                type: Number,
                isRequired: true
            }
        }]
    }],
    city: {
        iata: {
            type: String,
            isRequired: true
        },
        name: {
            type: String,
            isRequired: true
        }
    },
    country: {
        iata: {
            type: String,
            isRequired: true
        },
        name: {
            type: String,
            isRequired: true
        }
    }
});

module.exports = Hotel = mongoose.model('hotel', HotelSchema);