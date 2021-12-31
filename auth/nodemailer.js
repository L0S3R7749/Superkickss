const nodemailer = require('nodemailer');
const User = require('../models/User');
const Token = require('../models/Token');

//create nodemailter  transport
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.USER_PASS,
    }
});

module.exports ={
    sendResetPassword: async (email,token)=>{
        const url=process.env.HOST_URL+`/auth/reset-password?token=`+token;
        await Token({
            token: token,
            email: email,
        }).save();
        console.log(url);
        // await transport.sendMail({
        //     from: 'Email',
        //     to: email,
        //     subject: 'RESET YOUR PASSWORD',
        //     text: `Click this link to reset your password: ${url}`,
        // });
    }
}
