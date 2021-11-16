var express = require("express");
var router = express.Router();

let fs = require("fs");

let Order = require("../models/schema/Order");
let User = require("../models/schema/User");
let Product = require("../models/schema/Product");

/* GET about page. */
router.get("/", async (req, res, next) => {
  try {
    const sample_users = JSON.parse(
      fs.readFileSync(__dirname + "/data/users.json", "utf-8")
    );
    num_user = await User.count({});
    if (num_user === 0 && sample_users) {
      newUsers = await User.insertMany(sample_users);
      console.log(newUsers);
      console.log("Insert users conplete");
    }
  } catch (e) {
    console.log(e);
  }

  try {
    const sample_products = JSON.parse(
      fs.readFileSync(__dirname + "/data/products.json", "utf-8")
    );
    num_products = await Product.count({});
    if (num_products === 0 && sample_products) {
      newProducts = await Product.insertMany(sample_products);
      console.log(newProducts);
      console.log("Insert products conplete");
    }
  } catch (e) {
    console.log(e);
  }

  try {
    const sample_orders = JSON.parse(
      fs.readFileSync(__dirname + "/data/orders.json", "utf-8")
    );
    num_orders = await Order.count({});
    if (num_orders === 0 && sample_orders) {
      newOrders = await Order.insertMany(sample_orders);
      console.log(newOrders);
      console.log("Insert orders conplete");
    }
  } catch (e) {
    console.log(e);
  }

  res.redirect("/");
});

module.exports = router;
