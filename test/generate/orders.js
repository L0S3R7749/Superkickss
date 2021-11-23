// const express = require("express");
// const router = express.Router();
// const faker = require("faker");

// const Product = require("../../models/schema/Product");
// const User = require("../../models/schema/User");

// const random = (min, max) => {
//   let range = max - min;
//   return Math.floor(Math.random() * range) + min;
// };

// // Pick it a random size, from 38 to 44, and random qty for each size
// const createProductDetails = (
//   minSize = 38,
//   maxSize = 44,
//   minQty = 0,
//   maxQty = 10
// ) => {
//   // Randomly pick a element from minsize to maxsize, and each of them have a ramdom quantity
//   let sizes = Array.from(
//     { length: maxSize - minSize + 1 },
//     (_, i) => i + minSize
//   ); // [min ... max]
//   let range = maxQty - minQty;
//   return sizes.map((x) => {
//     return { size: x, quantity: random(minQty, maxQty) };
//   });
// };

// const createImages = () => {
//   let num_images = random(1, 5);
//   let image_priority = Array.from(Array(num_images).keys()); // [0 ... n]
//   return image_priority.map((x) => {
//     return { url: faker.image.image(), priority: x };
//   });
// };

// const createCategories = (array) => {
//   // Pick random n elements
//   const num_categories = random(1, array.length);
//   const shuffled = array.sort(() => 0.5 - Math.random());
//   const selected = shuffled.slice(0, num_categories);
//   return selected.map((item) => {
//     return { name: item };
//   });
// };

// const createTags = (array) => {
//   const num_tags = random(0, array.length);
//   const shuffled = array.sort(() => 0.5 - Math.random());
//   const selected = shuffled.slice(0, num_tags);
//   return selected.map((item) => {
//     return { name: item };
//   });
// };

// const createRandomItems = async (min, max) => {
//   let num_items = random(min, max);

//   let array = Array.from(Array(num_items).keys());

//   return await Promise.all(
//     array.map(async () => {
//       const count = await User.count();
//       const rand = Math.floor(Math.random() * count);
//       const result = await User.findOne().skip(rand);
//       return {
//         userId: result.id,
//         fullname: result.fullname,
//         content: faker.lorem.text(),
//         createdTime: faker.date.past(),
//       };
//     })
//   );
// };

// const createRandomUser = async () => {
//   const count = await User.count();
//   const rand = Math.floor(Math.random() * count);
//   const result = await User.findOne().skip(rand);
//   return {
//     _id: result._id,
//     fullname: result.fullname,
//     shippingAddress: result.address[0]
//   };
// }

// const dateChain = (status) => {
//   if (status === "not check out") {
//     const createdDate = faker.date.past();
//     return {
//       createdDate: createdDate
//     };
//   } else if (status === "in progress") {
//     const createdDate = faker.date.past();
//     const acceptedDate = faker.date.between(createdDate, Date.now);
//     return {
//       createdDate: createdDate,
//       acceptedDate: acceptedDate
//     };
//   } else if (status === "shipping") {
//     const createdDate = faker.date.past();
//     const acceptedDate = faker.date.between(createdDate, Date.now);
//     const deliveryDate = faker.date.between(acceptedDate, Date.now);
//     return {
//       createdDate: createdDate,
//       acceptedDate: acceptedDate,
//       deliveryDate: deliveryDate
//     };
//   } else {
//     const createdDate = faker.date.past();
//     const acceptedDate = faker.date.between(createdDate, Date.now);
//     const deliveryDate = faker.date.between(acceptedDate, Date.now);
//     const completeDate = faker.date.between(deliveryDate, Date.now);
//     return {
//       createdDate: createdDate,
//       acceptedDate: acceptedDate,
//       deliveryDate: deliveryDate,
//       completeDate: completeDate
//     };
//   }
// }

// const statuses = Array("not checkout", "in progress", "shipping", "completed");

// const createOrders = async (numOrders = 50) => {
//   return await Promise.all(
//     Array.from({ length: numOrders }, async () => {
//       try {
//         const user = await createRandomUser();
//         const status = statuses[Math.floor(Math.random()*statuses.length)];
//         const dateChain = dateChain(status);
//         const payment = "Paypal";
//         const item = await createRandomItems();
//         return {
//           user: user,
//           status: status,
//           createdDate: ,
//           accepted
//         };
//       } catch (e) {
//         console.log(e);
//       }
//     })
//   );
// };

// router.get("/", async (req, res, next) => {
//   try {
//     num_product = await Product.count({});
//     // if (num_user !== 0) return res.redirect("/");
//     console.log("Starting generate...");
//     let fakeProducts = await createProducts(50);
//     // console.log(fakeProducts[0]);
//     await Product.insertMany(fakeProducts);
//   } catch (e) {
//     console.log(e);
//   }
//   res.redirect("/");
// });

// module.exports = router;
