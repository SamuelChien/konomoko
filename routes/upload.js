const express = require('express');
const router = express.Router();
const emailHelper = require('../lib/email');
const pdfHelper = require('../lib/pdf');
const Report = require('../models/report');
// Handles multi-part media
const Config = require('../config'), serverConfig = new Config();
const path = require('path');
const multer = require('multer')
const MulterAzureStorage = require('multer-azure-storage')
const upload = multer({
      storage: new MulterAzureStorage({
        azureStorageConnectionString: serverConfig.azureStorageConnectionString,
        azureStorageAccessKey: serverConfig.azureStorageAccessKey,
        azureStorageAccount: serverConfig.azureStorageAccount,
        containerName: 'reports',
        containerSecurity: 'blob',
        fileName: function(req, file, cb) {
          return Date.now() + "-FullReport";
        },
      }),
      fileFilter:  function (req, file, cb) {
        if (path.extname(file.originalname) !== '.pdf') {
          return cb(null, false)
        }
        cb(null, true)
      },
      limits: { fileSize: 500000000 } // 50MB
    }).single('report');


/* POST to upload report to Storage. */
router.post('/', upload, function(req, res) {
    if(!req.file) {
      res.send("Only PDF under 5MB can be uploaded.");
    }

    const report = new Report({
      report_id: req.file.blob,
      mls: req.body.mls,
      address: req.body.address,
      uploader_id: req.user.username,
      storage_location: req.file.url
    });
    report.save();

    emailHelper.emailAdminForReportUploaded(req.body.mls, req.user.username, req.file.url);
    pdfHelper.getPreviewUrl(req.file.url);

    res.redirect('dashboard');
});

module.exports = router;