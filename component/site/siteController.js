const services = require('./siteServices');

module.exports = {
    about: (req, res, next) => {
        res.render("./default/index", {
            title: "Homepage",
            body: "../site/about",
        });
    },

    contact: (req, res, next) => {
        res.render('./default/index', {
            title: 'Contact',
            body: '../site/contact',
        });
    },

    sendContact: async (req, res, next) => {
        try {
            const send = await services.sendContact(req.body.fname, req.body.lname, req.body.email, req.body.title, req.body.message, )
            if (send===1) {
                res.status(201).json({
                    message: 'Success, wait for reply'
                });
            } else {
                res.status(500).json({
                    message: 'Something wrong'
                });
            }
        } catch (err) {
            next(err);
        }
    }
}