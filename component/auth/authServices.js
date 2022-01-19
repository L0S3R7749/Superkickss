const User = require('../../models/User');
const nodemailer = require('nodemailer');

module.exports = {
    findUser: (username, email, phone) => {
        return User.findOne({
            $and: [{
                    $or: [{
                            username: username
                        },
                        {
                            email: email
                        },
                        {
                            phoneNumber: phone
                        }
                    ]
                },
                {
                    userRight: 'user'
                }
            ]
        }).lean();
    },

    createUser: ({
        fullname,
        username,
        hashpassword,
        email,
        phone
    }) => {
        return User.create({
            fullname,
            username,
            password: hashpassword,
            email,
            phoneNumber: phone,
            userRight: 'user'
        });
    },

    findUserByEmail: (email) => {
        return User.findOne({
            email: email,
            userRight: 'user',
        });
    },

    sendResetPassword: (email, token) => {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_GMAIL,
                pass: process.env.USER_PASS,
            }
        });
        const url = process.env.HOST_URL + `/auth/reset-password?token=` + token;
        const html = `<h4>Click this link to reset your password: </h4>
                    <a href="${url}" style="font-size: 24px;">Link</a>`
        const mailOptions = {
            from: 'Email',
            to: email,
            subject: 'RESET YOUR PASSWORD',
            text: `Click this link to reset your password (expire after 5 minutes): ${url}`,
            html: html,
        }
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },

    resetPassword: (_id, hashPassword) => {
        return User.findByIdAndUpdate(_id, {
            $set: {
                password: hashPassword
            }
        });
    },

    sendVerify: (email, token) => {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_GMAIL,
                pass: process.env.USER_PASS,
            }
        });
        const url = process.env.HOST_URL + `/auth/verify?token=` + token;
        const html = `<h4>Click this link to verify your account: </h4>
                    <a href="${url}" style="font-size: 24px;">Link</a>`
        const mailOptions = {
            from: 'Email',
            to: email,
            subject: 'VERIFY',
            text: `Click this link to verify your account: ${url}`,
            html: html,
        }
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },

    verify: (_id) => {
        return User.findByIdAndUpdate(_id, {
            $set: {
                isVerified: true
            }
        });
    },

    changePassword: (_id, password) => {
        return User.findByIdAndUpdate(_id, {
            $set: {
                password: password
            }
        });
    },

    changeAvatar: (_id, url) => {
        return User.findByIdAndUpdate(_id, {
            $set: {
                avatar: url
            }
        });
    },

    editInfo: (_id, fullname, addresses) => {
        return User.findByIdAndUpdate(_id, {
            $set: {
                fullname: fullname,
                addresses: addresses
            }
        });
    }
};