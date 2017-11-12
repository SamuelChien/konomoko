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
    uploader: {
        type: String
    },
    storage_location: {
        type: String
    },
    time : {
        type: Date, 
        default: Date.now 
    }
});

const Report = module.exports = mongoose.model('Report', ReportSchema);

module.exports.getFuzzySearch = function(searchTerm, callback){
    Report.find({$or:[{"mls":{$regex:searchTerm}}, {"address":{$regex:searchTerm}}]}, callback);
}

module.exports.getReportById = function(id, callback){
    Report.findOne({"report_id":id}, callback);
}
