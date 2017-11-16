const mongoose = require('mongoose');

// Transaction Schema
const FeedbackSchema = mongoose.Schema({
    id: {
        type: Number,
        index:true
    },
    email: {
        type: String
    },
    text: {
        type: String
    },
    time : {
        type: Date,
        default: Date.now
    }},
    { _id: true, timestamps: true });

const Feedback = module.exports = mongoose.model('Feedback', FeedbackSchema);