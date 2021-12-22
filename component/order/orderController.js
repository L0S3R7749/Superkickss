const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("./default/index", {
        title: "Homepage",
        body: "../order/checkout",
      });
  // res.send('Response from order router');
})

module.exports = router;