const services = require('./authServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');
const {
    uploadImage
} = require('../../middleware/cloudinary');

module.exports = {
    getLogin: (req, res) => {
        res.render('./default/index', {
            title: 'Login',
            body: '../auth/login',
            message: req.flash('error')
        });
    },

    info: (req, res) => {
        res.render('./default/index', {
            title: 'User info',
            body: '../auth/info',
            user: res.locals.user
        });
    },

    viewForgotPassword: (req, res) => {
        res.render('./default/index', {
            title: 'Forgot password',
            body: '../auth/forgotpassword',
            message: '',
        });
    },

    forgotPassword: async (req, res, next) => {
        try {
            const account = await services.findUserByEmail(req.body.email);
            if (account) {
                const token = jwt.sign({
                    account
                }, process.env.PRIVATE_KEY, {
                    expiresIn: '5m'
                });
                services.sendResetPassword(req.body.email, token);
                res.status(200).json({message: 'Check your mail to get link reset password, it will be expire after 5 minutes'});
            } else {
                res.status(400).json({
                    message: 'Cannot find this account'
                });
            }
        } catch (err) {
            next(err);
        }
    },

    viewResetPassword: async (req, res) => {
        const token = req.query.token;
        if (token) {
            res.render('./default/index', {
                title: 'Reset password',
                body: '../auth/resetpassword',
                message: req.flash('error'),
            });
        }
    },

    resetPassword: async (req, res, next) => {
        const {
            token
        } = req.query;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const regex = /[.\-\:><= *+?^${}()|[\]\\]/g;

        if (password !== confirmPassword) {
            req.flash('error', 'Your confirm password not correct');
            res.redirect('/auth/reset-password?token=' + token);
        } else if (password.length < 6 || password.length > 16) {
            req.flash('error', 'Your password must have at least 6 characters or no more than 16 characters');
            res.redirect('/auth/reset-password?token=' + token);
        } else if (password.match(regex)) {
            req.flash('error', 'Your password must not have special characters');
            res.redirect('/auth/reset-password?token=' + token);
        }
        try {
            const hashPassword = bcrypt.hashSync(password, 10);
            if (token) {
                const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
                if (!decodedToken) {
                    //TODO: add message
                    return;
                }
                const account = await services.resetPassword(decodedToken.account._id, hashPassword);
                if (account) {
                    res.redirect('/auth/login');
                }
            }
        } catch (err) {
            next(err);
        }
    },

    viewChangePassword: (req, res) => {
        res.render('./default/index', {
            title: 'Change password',
            body: '../auth/changepassword',
            message: req.flash('error'),
        });
    },

    changePassword: async (req, res, next) => {
        try {
            const account = res.locals.user;
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            const confirmPassword = req.body.confirmPassword;
            const regex = /[.\-\:><= *+?^${}()|[\]\\]/g;
            const hashPassword = bcrypt.hashSync(newPassword, 10);
            if (currentPassword.length == 0 || newPassword.length == 0 || confirmPassword.length == 0) {
                req.flash('error', 'Please fill all field.');
                res.redirect('/auth/change-password');
            } else if (!bcrypt.compareSync(currentPassword, account.password)) {
                req.flash('error', 'Your current password not correct');
                res.redirect('/auth/change-password');
            } else if (newPassword !== confirmPassword) {
                req.flash('error', 'Your confirm password not correct');
                res.redirect('/auth/change-password');
            } else if (newPassword.length < 6 || newPassword.length > 16) {
                req.flash('error', 'Your password must have at least 6 characters or no more than 16 characters');
                res.redirect('/auth/change-password');
            } else if (newPassword.match(regex)) {
                req.flash('error', 'Your password must not have special characters');
                res.redirect('/auth/change-password');
            } else {
                await services.changePassword(account._id, hashPassword);
                res.redirect('/');
            }
        } catch (err) {
            next(err);
        }
    },

    editInfo: async (req, res, next) => {
        let _id = req.body.userId;
        let fullname = req.body.fullname;
        let address = req.body.address;
        try {
            let user = await services.editInfo(_id, fullname, address);
            if(user){
                res.redirect('/auth/info');
            }
        } catch (err) {
            next(err);
        }
    },

    changeAvatar: async (req, res, next) => {
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            const result = await uploadImage(files.avatar.filepath);
            await services.changeAvatar(res.locals.user._id, result.url);
            res.redirect('/auth/info');
        });
    },

    getSignup: (req, res, next) => {
        res.render('./default/index', {
            title: 'Signup',
            body: '../auth/signup',
            message: req.flash('error')
        });
    },

    postSignup: async (req, res, next) => {
        const {
            fullname,
            username,
            email,
            phone,
            password,
            confirmPassword
        } = req.body;

        if (password != confirmPassword) {
            req.flash('error', 'Confirm-password does not match!');
            res.redirect('/auth/signup');
        } else {
            try {
                const checkExist = await services.findUser(username, email, phone);
                if (checkExist) {
                    req.flash('error', 'This user already exists!');
                    res.redirect('/auth/signup');
                } else {
                    const hashpassword = bcrypt.hashSync(password, 10);
                    const account = await services.createUser({
                        fullname,
                        username,
                        hashpassword,
                        email,
                        phone
                    });
                    const token = jwt.sign({
                        account
                    }, process.env.PRIVATE_KEY);
                    services.sendVerify(email, token);
                    res.render('./default/index', {
                        title: 'Change password',
                        body: '../auth/notification',
                        message: 'Register successfully, check email to verify account',
                    });
                }
            } catch (err) {
                next(err);
            }
        }
    },

    verify: async (req, res, next) => {
        const {
            token
        } = req.query;
        if (token) {
            const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
            if (!decodedToken) {
                return;
            }
            try {
                const account = await services.verify(decodedToken.account._id);
                if (account) {
                    res.render('./default/index', {
                        title: 'Change password',
                        body: '../auth/notification',
                        message: 'Verify successfully',
                    });
                }
            } catch (err) {
                next(err);
            }
        }
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    }
}