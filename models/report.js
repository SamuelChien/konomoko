var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Report Schema
var ReportSchema = mongoose.Schema({
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
    inspector: {
        type: String
    },
    pdfId: {
        type: String
    }

});

var Report = module.exports = mongoose.model('Report', ReportSchema);

module.exports.getFuzzySearch = function(searchTerm, callback){
    Report.find({$or:[{"mls":{$regex:searchTerm}}, {"address":{$regex:searchTerm}}]}, callback);
}
