var nodemailer = require('nodemailer');

function emailCustomerReports(email, reportId){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'samuelchien821@gmail.com',
            pass: 'Sc123456789'
        }
    });

    var mailOptions = {
        from: 'samuelchien821@gmail.com',
        to: email,
        subject: 'Konomoko Inspection Report',
        text: reportId,
        attachments:[{filename:'konomokoReport.pdf', path:'https://konomoko.blob.core.windows.net/reports/1510437958496-CustomizedReportName'}]
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.emailCustomerReports = emailCustomerReports;