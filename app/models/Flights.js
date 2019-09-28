const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    dateTo: {
        type: Date(),
        isRequired: true
    },
    dateFrom: {
        type: Date(),
        isRequired: true
    },
    price: {
        type: Number,
        isRequired: true
    },
    class: {
        type: "String",
        isRequired: true
    },
    company: {
        type: String,
        isRequired: true
    }
});

module.exports = Flight = mongoose.model('flight', FlightSchema);