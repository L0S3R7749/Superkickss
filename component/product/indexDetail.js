const express = require('express');
const apicaller = require('../../public/js/apiCaller');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  apicaller.callApi(`product/api?id=${req.query.id}`,'GET',null)
    .then(function(responseData) {
      res.render('./default/index', { title: 'Product Detail' ,body: '../product/detail', product: responseData.data});
    })
    .catch(err => {
      res.send(err);
    })
});

module.exports = router;
