const services = require('./authServices');
const passport = require('../../auth/passport');
const bcrypt = require('bcrypt');

module.exports = {
    getLogin: (req, res, next) => {
        res.render('./default/index', {
            title: 'Login',
            body: '../auth/login',
            message: req.flash('error')
        });
    },
    info: (req, res, next) => {
        res.render('./default/index', {
            title: 'User info',
            body: '../auth/info',
            user: res.locals.user
        });
    },
    forgotPassword: (req, res, next) => {
        res.render('./auth/forgotpassword', {
            title: 'forgot'
        });
    },
    changePassword: (req, res, next) => {
        res.render('./default/index', {
            title: 'Change password',
            body: '../auth/changepassword'
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
            const checkExist = await services.findUser({
                username,
                email,
                phone
            });

            if (checkExist) {
                req.flash('error', 'This user already exists!');
                res.redirect('/auth/signup');
            } else {
                const hashpassword = bcrypt.hashSync(password, 10);
                await services.createUser({
                    fullname,
                    username,
                    hashpassword,
                    email,
                    phone
                });
                res.redirect('/');
            }
        }
    },
    logout: (req,res,next)=>{
        req.logOut();
        res.redirect('/');
    }
}