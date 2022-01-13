const services = require('./homepageService');

module.exports = {
    home: async (req, res, next) => {
        let products = await services.randomProduct();
        res.render('./default/index', {
            title: 'Homepage',
            body: '../../views/default/home',
            products: products,
        });
    }
}