const indexRouter = require("./homepage");
const aboutRouter = require("./about");
const contactRouter = require("./contact");
const shopRouter = require("./product");
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.use("/", indexRouter);
router.use("/about",aboutRouter);
router.use("/contact",contactRouter);
router.use("/product", shopRouter);

module.exports = router;