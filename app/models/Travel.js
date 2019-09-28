const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        privateCheclist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'checklist'
        },
        isAdmin: {
            type: Boolean
        }
    }],
    isDaily: {
        type: Boolean,
        isRequired: true
    },
    isPopular: {
        type: Boolean,
        isRequired: true
    },
    publicCheclist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'checklist',
        isRequired: false
    },
    name: {
        type: String,
        isRequired: true
    },
    cost: {
        type: Number,
        isRequired: false
    },
    minBudget: {
        type: Number,
        isRequired: false
    },
    maxBudget: {
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
        },
        name: {
            type: String,
            isRequired: true
        }
    },
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
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'flight',
        isRequired: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel'
    },
    backgroundImage: {
        type: String,
        isRequired: true
    }
});

module.exports = Travel = mongoose.model('travel', TravelSchema);
