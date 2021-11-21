const express = require("express");
const router = express.Router();
const faker = require("faker");
const uuid4 = require("uuid4");

const User = require("../../models/schema/User");

router.get("/", async (req, res, next) => {
  try {
    num_user = await User.count({});
    // if (num_user !== 0) return res.redirect("/");
    console.log("Starting generate...");

    const createAddresses = (maxAddrs = 5) => {
      let addrs = Math.floor(Math.random() * maxAddrs);
      return Array.from({ length: addrs }, () => {
        return {
          address: faker.address.streetAddress(),
        };
      });
    };

    const createUsers = (numUsers = 10) => {
      return Array.from({ length: numUsers }, () => {
        return {
          _id: uuid4(),
          fullName: faker.name.findName(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.phoneNumberFormat(),
          addresses: createAddresses(),
          userRight: "user",
        };
      });
    };

    let fakeUsers = createUsers(10);
    console.log(fakeUsers);
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
});

module.exports = router;
