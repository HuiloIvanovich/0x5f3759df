const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    users: [{
        id: {
            type: String,
            isRequired: true
        },
        isAdmin: {
            type: Boolean,
            isRequired: true
        }
    }],
    data: {
        name: {
            type: String,
            isRequired: true
        },
        cost: {
            type: Number,
            isRequired: false
        },
        minCost: {
            type: Number,
            isRequired: false
        },
        maxCost: {
            type: Number,
            isRequired: false
        },
        dateFrom: {
            type: Date,
            isRequired: true
        },
        dateTo: {
            type: Date,
            isRequired: true
        },
        visas: [{
            visaType: {
                type: String,
                isRequired: false
            }
        }],
        country: {
            iata: {
                type: String,
                isRequired: true
            }
        },
        city: {
            iata: {
                type: String,
                isRequired:true
            }
        },
        backgroundImage: {
            type: String,
            isRequired: false
        }
    }

});

module.exports = Travel = mongoose.model('travel', TravelSchema);