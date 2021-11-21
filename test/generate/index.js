const express = require("express");
const router = express.Router();

const fakeUsers = require("./users");
const fakeProducts = require("./products");
const fakeOrders = require("./orders");

router.use("/users", fakeUsers);
router.use("/products", fakeProducts);
// router.use("/orders", fakeOrders);

module.exports = router;
