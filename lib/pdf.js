const https = require('https');
const fs = require('fs');
const hummus = require('hummus');
const azure = require('azure-storage');
const Config = require('../config'), serverConfig = new Config();
const Report = require('../models/report');


function getPreviewUrl(url){
    var pdfName = Date.now() + "-reportParsing.pdf";
    var fullDocumentPath = __dirname + '/../public/pdf/temp-' + pdfName;
    var previewDocumentPath = __dirname + "/../public/pdf/prev-" + pdfName;

    var file = fs.createWriteStream(fullDocumentPath);
    var request = https.get(url, function(response) {
        var stream = response.pipe(file);
        stream.on('finish', function () {
            var pdfReader = hummus.createReader(fullDocumentPath);
            var pdfWriter = hummus.createWriter(previewDocumentPath);
            var copyingContext = pdfWriter.createPDFCopyingContext(fullDocumentPath);
            var pdfPageCount = pdfReader.getPagesCount() - 1;
            var loopCount = pdfPageCount > 4 ? 2 : 0;
            var pageIndexArray = [0];
            for (var i = 0; i < loopCount; i++) {
                pageIndexArray.push(Math.floor((Math.random() * pdfPageCount) + 1));
            }
            pageIndexArray.sort(function sortNumber(a,b) {return a - b;}).forEach(function(i) {
                copyingContext.appendPDFPageFromPDF(i);
            });
            pdfWriter.end();

            //upload
            var blobService = azure.createBlobService(serverConfig.azureStorageAccount, serverConfig.azureStorageAccessKey);


            blobService.createBlockBlobFromLocalFile('reports', Date.now() + "-PreviewReport", previewDocumentPath, function (error, result, response) {
                if (!error) {
                    console.log(serverConfig.azureStorageConnectionString + "reports/" + result.name);
                    var previewLocation = serverConfig.azureStorageConnectionString + "reports/" + result.name;

                    Report
                        .find()
                        .where('storage_location').equals(url)
                        .exec(function (err, reports) {
                            if (err) console.log(err);
                            reports.forEach (report => {
                                report.preview_location = previewLocation;
                                report.save();
                            });
                        });

                    fs.unlinkSync(fullDocumentPath);
                    fs.unlinkSync(previewDocumentPath);
                }
                else {
                    console.log(error);
                }
            });
        });
    });
}

exports.getPreviewUrl = getPreviewUrl;