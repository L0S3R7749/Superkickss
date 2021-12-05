const User = require('../../models/schema/User');

exports.findUser = ({usernanmeFind, emailFind, phoneFind}) => {
    return User.findOne({$or: [
        {username: usernanmeFind},
        {email: emailFind},
        {phoneNumber: phoneFind}
    ]});
}

exports.createUser = ({fullname, username, hashpassword, email, phone}) => {
    return User.create({
        fullname,
        username,
        password: hashpassword,
        email,
        phoneNumber: phone,
        userRight: 'user'
    });
}