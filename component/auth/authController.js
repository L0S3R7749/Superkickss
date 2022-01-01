const services = require('./authServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    viewForgotPassword: (req, res, next) => {
        res.render('./default/index', {
            title: 'Forgot password',
            body: '../auth/forgotpassword',
            message: '',
        });
    },

    forgotPassword: async (req, res, next) => {
        const user = await services.findUserByEmail(req.body.email);
        if (user) {
            const token = jwt.sign({
                user
            }, process.env.PRIVATE_KEY, {
                expiresIn: '10m'
            });
            services.sendResetPassword(req.body.email,token);
            res.status(200);
        } else {
            res.status(400).json({
                message: 'Cannot find this account'
            });
        }
    },

    viewResetPassword: async (req, res, next) => {
        const token = req.query.token;
        if (token) {
            res.render('./default/index', {
                    title: 'Reset password',
                    body: '../auth/resetpassword',
                });
        }
        else {

        }
    },

    resetPassword: async (req,res,next)=>{
        const {token}=req.query;
        const password=req.body.password;
        try{
            const hashPassword = bcrypt.hashSync(password, 10);
            if(token){
                const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
                if (!decodedToken) {
                    // throw { message: "Token validate fail", status: 500 };
                    return;
                }
                const user=await services.resetPassword(decodedToken.user._id,hashPassword);
                if(user){
                    res.render('./default/index', {
                        title: 'Login',
                        body: '../auth/login',
                        message: req.flash('error')
                    });
                }
            }
        }catch(err){

        }
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
    logout: (req, res, next) => {
        req.logOut();
        res.redirect('/');
    }
}
