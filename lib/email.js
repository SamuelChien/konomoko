var nodemailer = require('nodemailer');
var userName = 'info@mangoinspect.com';
var password = 'Sc123456';
var companyEmail = 'info@mangoinspect.com';

function sentEmail(mailOptions){
    var transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
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

function emailForSchedule(email, searchPhrase, phoneNum){

    var mailOptions = {
        from: companyEmail,
        to: email,
        subject: 'MangoInspect Inspection Report',
        text: 'Thank you for choosing MangoInspect. We will schedule the inspection within 48 hours. Enjoy!'
    };
    sentEmail(mailOptions);

    mailOptions = {
        from: companyEmail,
        to: companyEmail,
        subject: 'MangoInspect Schedule Request',
        text: "Customer: " + email + " Phone Number: " + phoneNum + " Schedule a inspection for: " + searchPhrase
    };
    sentEmail(mailOptions);
}

exports.emailForSchedule = emailForSchedule;

function emailForUpload(params){
    var mailOptions = {
        from: companyEmail,
        to: companyEmail,
        subject: 'MangoInspect Upload Notification',
        text: 'Seller: ' + params.email + ' MLS: ' + params.mls + ' URL: ' + params.reportUrl
    };
    sentEmail(mailOptions);

    var mailOptions = {
        from: companyEmail,
        to: params.email,
        subject: 'MangoInspect Upload Confrimation',
        text: 'Thank you for choosing MangoInspect. We have received your upload for mls: '
            + params.mls + " at address: " + params.address + "\n"
            + "We will review the document within 12 hours and have your report active for sale soon."
    };
    sentEmail(mailOptions);
}

exports.emailForUpload = emailForUpload;



function emailForPurchased(buyerEmail, sellerEmail, mls, reportURL){
    var mailOptions = {
        from: companyEmail,
        to: buyerEmail,
        subject: 'MangoInspect Inspection Report',
        text: 'Thank you for choosing MangoInspect. Enjoy! Feel free to call us 206-972-2280 if you have any question or concern.',
        attachments: [{filename:'MangoInspectReport.pdf', path:reportURL}]
    };
    sentEmail(mailOptions);
    
    var mailOptions = {
        from: companyEmail,
        to: sellerEmail,
        subject: 'MangoInspect Inspection Purchase Notification',
        text: 'A report - MLS:' + mls + ' has been purchased. $100 added to your balance.'
    };
    sentEmail(mailOptions);

    mailOptions = {
        from: companyEmail,
        to: companyEmail,
        subject: 'MangoInspect Transaction Notification',
        text: "Customer: " + buyerEmail + " Seller: " + sellerEmail + " MLS: " + mls + "URL: " + reportURL
    };
    sentEmail(mailOptions);

}
exports.emailForPurchased = emailForPurchased;

