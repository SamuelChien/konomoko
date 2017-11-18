const mongoose = require('mongoose');

// Report Schema
const ReportSchema = mongoose.Schema({
    report_id: {
        type: String,
        index:true
    },
    mls: {
        type: String
    },
    address: {
        type: String
    },
    uploader_id: {
        type: String
    },
    storage_location: {
        type: String
    },
    preview_location: {
        type: String
    },
    number_of_sales: {
        type: Number,
        default: 0
    },
    revenue: {
        type: Number, // Money is stored in integer. Eg. $10.99 is stored as 1099
        default: 0
    }},
    { timestamps: true });

const Report = module.exports = mongoose.model('Report', ReportSchema);

module.exports.getFuzzySearch = function(searchTerm, callback){
    Report.find({$or:[{"mls":{$regex:searchTerm}}, {"address":{$regex:searchTerm}}]}, callback);
}

module.exports.getReportById = function(id, callback){
    Report.findOne({"report_id":id}, callback);
}
