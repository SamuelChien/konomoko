var nodemailer = require('nodemailer');
var userName = 'samuelchien821@gmail.com';
var password = 'Sc1234567890';
var companyEmail = 'samuelchien821@gmail.com';

function sentEmail(mailOptions){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: userName,
            pass: password
        }
    });

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function emailAdminForSchedule(email, searchPhrase, phoneNum){

    var mailOptions = {
        from: companyEmail,
        to: email,
        subject: 'Konomoko Inspection Report',
        text: 'Thank you for choosing Konomoko. We will schedule the inspection within 48 hours. Enjoy!'
    };
    sentEmail(mailOptions);

    mailOptions = {
        from: companyEmail,
        to: email,
        subject: 'Konomoko Schedule Request',
        text: "Customer: " + email + " Phone Number: " + phoneNum + " Schedule a inspection for: " + searchPhrase
    };
    sentEmail(mailOptions);
}

exports.emailAdminForSchedule = emailAdminForSchedule;



function emailCustomerReports(email, reportURL){
    var mailOptions = {
        from: companyEmail,
        to: email,
        subject: 'Konomoko Inspection Report',
        text: 'Thank you for choosing Konomoko. Enjoy! Feel free to call us 206-972-2280 if you have any question or concern.',
        attachments: [{filename:'konomokoReport.pdf', path:reportURL}]
    };
    sentEmail(mailOptions);
}

exports.emailCustomerReports = emailCustomerReports;