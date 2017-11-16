const mongoose = require('mongoose');

// Transaction Schema
const ScheduleSchema = mongoose.Schema({
    schedule_id: {
        type: String,
        index:true
    },
    buyer_email: {
        type: String
    },
    buyer_phone: {
        type: String
    },
    schedule_searchTerm: {
        type: String
    },
    time : {
        type: Date,
        default: Date.now
    }},
    { timestamps: true });

const Schedule = module.exports = mongoose.model('Schedule', ScheduleSchema);