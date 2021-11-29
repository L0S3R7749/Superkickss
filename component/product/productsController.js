const services = require('./productsService');
const express = require('express');
const apicaller = require('../../public/js/apiCaller');
const router = express.Router();

router.get('/', function(req, res, next) {
    apicaller.callApi(`product/api?page=${req.query.page}`,'GET',null)
        .then(function(responseData) {
            res.render('./default/index', {title: 'Products', body: '../product/shop', products: responseData.data.products, current: responseData.data.current, pages: responseData.data.pages});
        })
        .catch(err => {
            res.send(err);
        })
});

router.get('/api', services.find);

module.exports = router;