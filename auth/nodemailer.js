const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const User = require('../models/User');
const Token = require('../models/Token');


const oAuth2Client= new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
//create nodemailter  transport
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.USER_GMAIL,
        pass: process.env.USER_PASS,
        clientId: process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
    }
});

module.exports = {
    sendResetPassword: async (email, token) => {
        const url = process.env.HOST_URL + `/auth/reset-password?token=` + token;
        await Token({
            token: token,
            email: email,
        }).save();
        console.log(url);
        // const accessToken= await oAuth2Client.getAccessToken();
        
        const mailOptions = {
            from: 'Email',
            to: email,
            subject: 'RESET YOUR PASSWORD',
            text: `Click this link to reset your password: ${url}`,
            html: `<h4>Click this link to reset your password: ${url}</h4>`,
        }
        await transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}