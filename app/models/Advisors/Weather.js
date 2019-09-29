const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
    averageTemperature: {
        type: Number,
        isRequired: true
    },
    averageWeather: {
        type: String,
        isRequired: true
    },
    days: [{
        temperature: {
            type: Number,
            isRequired: true
        },
        weather: {
            type: String,
            isRequired: true
        }
    }]
});

module.exports = Weather = mongoose.model('user', WeatherSchema);