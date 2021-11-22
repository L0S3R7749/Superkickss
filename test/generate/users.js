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
      let addrs = Math.floor(Math.random() * (maxAddrs - 1) + 1);
      return Array.from({ length: addrs }, () => {
        return {
          address: faker.address.streetAddress(),
        };
      });
    };

    const createUsers = (numUsers = 10) => {
      return Array.from({ length: numUsers }, () => {
        return {
          fullname: faker.name.findName(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.phoneNumberFormat(),
          addresses: createAddresses(),
          userRight: "user",
        };
      });
    };

    const createSuperUser = () => {
      return {
        fullname: faker.name.findName(),
        username: "loser",
        password: "123456",
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumberFormat(),
        addresses: createAddresses(),
        userRight: "admin",
      };
    };

    let fakeUsers = createUsers(10);
    let superUser = createSuperUser();
    console.log(fakeUsers);
    await User.insertMany(fakeUsers);
    await new User(superUser).save();
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
});

module.exports = router;
