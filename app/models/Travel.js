const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    id: {
        type: String,
        isRequired: true,
        unique: true
    }
});

module.exports = Travel = mongoose.model('user', TravelSchema);