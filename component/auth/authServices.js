const User = require('../../models/User');

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
    }
};

// exports.findUser = ({username, email, phone}) => {
//     return User.findOne({$and: [
//         {$or: [
//             {username: username},
//             {email: email},
//             {phoneNumber: phone}
//         ]},
//         {userRight: 'user'}]}).lean();
// }

// exports.createUser = ({fullname, username, hashpassword, email, phone}) => {
//     return User.create({
//         fullname,
//         username,
//         password: hashpassword,
//         email,
//         phoneNumber: phone,
//         userRight: 'user'
//     });
// }