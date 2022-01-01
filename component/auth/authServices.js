const User = require('../../models/User');
const nodemailer = require('nodemailer');

module.exports={
    findUser: (username,email,phone) =>{
        return User.findOne({$and: [
            {$or: [
                {username: username},
                {email: email},
                {phoneNumber: phone}
            ]},
            {userRight: 'user'}]}).lean();
    },
    
    createUser: ({fullname, username, hashpassword, email, phone})=>{
        return User.create({
            fullname,
            username,
            password: hashpassword,
            email,
            phoneNumber: phone,
            userRight: 'user'
        });
    },
    
    findUserByEmail: (email)=>{
        return User.findOne({
            email: email,
            userRight: 'user',
        });
    },

    findToken: (token)=>{
        return Token.findOne({
            token: token,
        });
    },

    sendResetPassword: async (email,token)=>{
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_GMAIL,
                pass: process.env.USER_PASS,
            }
        });
        const url=process.env.HOST_URL+`/auth/reset-password?token=`+token;
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
    },

    resetPassword: (_id,hashPassword)=>{
        return User.findByIdAndUpdate(_id,{$set: {password: hashPassword}});
    }
};