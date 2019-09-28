const mongoose = require('mongoose');

const ChecklistSchema = new mongoose.Schema({
    isPublic: {
        type: Boolean,
        isRequired: true
    },
    items: [{
        label: {
            type: String,
            isRequired: true
        },
        description: {
            type: String,
            isRequired: true
        },
        isCheckable: {
            type: Boolean,
            isRequired: true
        },
        isChecked: {
            type: Boolean,
            isRequired: false
        },
        users: [{
            user: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            isRequired: false
        }]
    }]
});

module.exports = Checklist = mongoose.model('checklist', ChecklistSchema);