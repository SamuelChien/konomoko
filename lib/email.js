var nodemailer = require('nodemailer');

function emailAdminForSchedule(email, searchPhrase, phoneNum){

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
        text: "Thank you for choosing Konomoko. We will schedule the inspection within 48 hours. Enjoy!",
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    var mailOptions = {
        from: 'samuelchien821@gmail.com',
        to: 'samuelchien821@gmail.com',
        subject: 'Konomoko Schedule Request',
        text: "Customer: " + email + " Phone Number: " + phoneNum + " Schedule a inspection for: " + searchPhrase,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.emailAdminForSchedule = emailAdminForSchedule;



function emailCustomerReports(email, reportURL){

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
        text: "Thank you for choosing Konomoko. Enjoy! Feel free to call us 206-972-2280 if you have any question or concern.",
        attachments:[{filename:'konomokoReport.pdf', path:reportURL}]
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