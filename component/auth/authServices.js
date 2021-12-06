const User = require('../../models/User');

exports.findUser = (usernameFind, emailFind, phoneFind) => {
    const dummyExactString = (string) => {
        return `\"${string}\"`;
    }
    return User.findOne({$and: [
        {$or: [
            {username: usernameFind},
            {email: emailFind},
            {phoneNumber: phoneFind}
        ]},
        {userRight: 'user'}]}).lean();
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