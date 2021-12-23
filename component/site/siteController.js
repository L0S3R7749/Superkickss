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
}
