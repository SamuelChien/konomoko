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
    buyer_phone: {
        type: String
    },
    time : {
        type: Date,
        default: Date.now
    }},
    { timestamps: true });

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);