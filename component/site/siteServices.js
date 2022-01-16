const nodemailer = require('nodemailer');

module.exports = {
    sendContact: (fname,lname,email,title,message)=>{
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_GMAIL,
                pass: process.env.USER_PASS,
            }
        });
        subject_text=fname+' '+lname+'-'+email+' - '+title;
        const mailOptions = {
            from: email,
            to: process.env.USER_GMAIL,
            subject: subject_text,
            text: message,
        }
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return 1;
    }
}