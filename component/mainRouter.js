const indexRouter = require("./homepage");
const aboutRouter = require("./about");
const authRouter = require("./auth");
const contactRouter = require("./contact");
const shopRouter = require("./product");
const orderRouter = require('./order');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.use("/", indexRouter);
router.use("/about", aboutRouter);
router.use("/auth", authRouter);
router.use("/contact", contactRouter);
router.use("/product", shopRouter);
router.use("/order", orderRouter);

module.exports = router;