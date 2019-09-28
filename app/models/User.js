const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        isRequired: true,
        unique: true
    },
    timestamps: {}
});

module.exports = User = mongoose.model('user', UserSchema);