const mongoose = require('mongoose');

// Transaction Schema
const TransactionSchema = mongoose.Schema({
    transaction_id: {
        type: String,
        index:true
    },
    report_id: {
        type: String
    },
    buyer_email: {
        type: String
    },
    buyer_rating: {
        type: Number
    },
    buyer_feedback: {
        type: String
    },
    time : {
        type: Date,
        default: Date.now
    }
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);