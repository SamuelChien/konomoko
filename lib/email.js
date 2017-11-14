var nodemailer = require('nodemailer');
var userName = 'samuelchien821@gmail.com';
var password = 'Sc1234567890';
var companyEmail = 'samuelchien821@gmail.com';

function sentEmail(from, to, subject, text, attachment){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: userName,
            pass: password
        }
    });

    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        attachment:attachment
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function emailAdminForSchedule(email, searchPhrase, phoneNum){
    var subject = 'Konomoko Inspection Report';
    var text = 'Thank you for choosing Konomoko. We will schedule the inspection within 48 hours. Enjoy!';
    sentEmail(companyEmail, email, subject, text, []);
    subject = 'Konomoko Schedule Request';
    text = "Customer: " + email + " Phone Number: " + phoneNum + " Schedule a inspection for: " + searchPhrase;
    sentEmail(companyEmail, email, subject, text, []);
}

exports.emailAdminForSchedule = emailAdminForSchedule;



function emailCustomerReports(email, reportURL){
    var subject = 'Konomoko Inspection Report';
    var text = 'Thank you for choosing Konomoko. Enjoy! Feel free to call us 206-972-2280 if you have any question or concern.';
    sentEmail(companyEmail, email, subject, text, [{filename:'konomokoReport.pdf', path:reportURL}]);
}

exports.emailCustomerReports = emailCustomerReports;