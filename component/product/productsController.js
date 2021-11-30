const services = require('./productsService');
const express = require('express');
const apicaller = require('../../public/js/apiCaller');
const router = express.Router();

router.get('/', function(req, res, next) {
    apicaller.callApi(`product/paramsApi?page=${req.query.page}`,'GET',null)
        .then(function(responseData) {
            res.render('./default/index', {title: 'Products', body: '../product/shop', home: '/product?', products: responseData.data.products, current: responseData.data.current, pages: responseData.data.pages});
        })
        .catch(err => {
            res.send(err);
        });
});

router.get('/detail', function(req, res, next) {
    apicaller.callApi(`product/api?id=${req.query.id}`,'GET',null)
      .then(function(responseData) {
        res.render('./default/index', { title: 'Product Detail' ,body: '../product/detail', product: responseData.data});
      })
      .catch(err => {
        res.send(err);
      });
});

router.get('/search', function(req, res, next) {
    apicaller.callApi(`product/paramsApi?search=${req.query.search}&page=${req.query.page}`,'GET',null)
        .then(function(responseData) {
            res.render('./default/index', {title: 'Products', body: '../product/shop', home: `/product/search?search=${req.query.search}&`, products: responseData.data.products, current: responseData.data.current, pages: responseData.data.pages});
        })
        .catch(err => {
            res.send(err);
        });
});

router.get('/api', services.find);
router.get('/paramsApi', services.list);

module.exports = router;