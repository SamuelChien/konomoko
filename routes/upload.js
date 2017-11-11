const express = require('express');
const router = express.Router();
// Handles multi-part media
const path = require('path');
const multer = require('multer')
const MulterAzureStorage = require('multer-azure-storage')
const upload = multer({
      storage: new MulterAzureStorage({
        azureStorageConnectionString: 'https://konomoko.blob.core.windows.net/',
        azureStorageAccessKey: 'FA2LvUQTv8rTX+U7CpOd5HwZ4L36BamKuPefVokiB/9YD4eAjODHmXeP0BWoilAPW6mulyM8oEG3E+7i5exezQ==',
        azureStorageAccount: 'konomoko',
        containerName: 'reports',
        containerSecurity: 'blob',
        fileName: function(req, file, cb) {
          return Date.now() + "-CustomizedReportName";
        },
      }),
      fileFilter:  function (req, file, cb) {
        if (path.extname(file.originalname) !== '.pdf') {
          return cb(null, false)
        }
        cb(null, true)
      },
      limits: { fileSize: 5000000 } // 5MB
    }).single('report');

/* GET upload form */
router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Upload' });
});


/* POST to upload report to Storage. */
router.post('/', upload, function(req, res, next) {
    console.log(req.body);
    console.log(req.file);
    if(!req.file) {
      res.send("Only PDF under 5MB can be uploaded.");
    }
    res.send("Uploaded 200 OK.");
});

module.exports = router;