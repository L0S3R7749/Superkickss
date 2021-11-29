const express = require("express");
const router = express.Router();
const faker = require("faker");

const Product = require("../../models/schema/Product");
const User = require("../../models/schema/User");

const random = (min, max) => {
  let range = max - min;
  return Math.floor(Math.random() * range) + min;
};

// Pick it a random size, from 38 to 44, and random qty for each size
const createProductDetails = (
  minSize = 38,
  maxSize = 44,
  minQty = 0,
  maxQty = 10
) => {
  // Randomly pick a element from minsize to maxsize, and each of them have a ramdom quantity
  let sizes = Array.from(
    { length: maxSize - minSize + 1 },
    (_, i) => i + minSize
  ); // [min ... max]
  let range = maxQty - minQty;
  return sizes.map((x) => {
    return { size: x, quantity: random(minQty, maxQty) };
  });
};

const createImages = () => {
  let num_images = random(1, 5);
  let image_priority = Array.from(Array(num_images).keys()); // [0 ... n]
  return image_priority.map((x) => {
    return { url: faker.image.image(), priority: x };
  });
};

const createCategory = (array) => {
  // Pick random n elements
  return array[Math.floor(Math.random()*array.length)];
};

const createTags = (array) => {
  const num_tags = random(0, array.length);
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, num_tags);
  return selected.map((item) => {
    return { name: item };
  });
};

const createComments = async (min, max) => {
  let num_cmts = random(min, max);

  let array = Array.from(Array(num_cmts).keys());
  // promise.all to return a array of promise
  return await Promise.all(
    array.map(async () => {
      const count = await User.count();
      const rand = Math.floor(Math.random() * count);
      const result = await User.findOne().skip(rand);
      return {
        userId: result.id,
        fullname: result.fullname,
        content: faker.lorem.text(),
        createdTime: faker.date.past(),
      };
    })
  );
};

const createProducts = async (numProducts = 50) => {
  return await Promise.all(
    Array.from({ length: numProducts }, async () => {
      try {
        let comments = await createComments(0, 10);
        return {
          name: faker.commerce.productName(),
          brand: faker.company.companyName(),
          price: faker.commerce.price((min = 100), (max = 9999), (dec = 2)),
          description: faker.commerce.productDescription(),
          SKU: faker.vehicle.vin(), // Random for nothing
          details: createProductDetails(),
          images: createImages(),
          category: createCategory([
            "Nam",
            "Nữ",
            "Đường phố",
            "Thể thao",
            "Hiện đại",
          ]),
          tags: createTags([
            "Trending",
            "Bán chạy",
            "Yêu thích",
            "Phù hợp",
            "Thời trang",
            "Nổi bật",
          ]),
          comments: comments,
        };
      } catch (e) {
        console.log(e);
      }
    })
  );
};

router.get("/", async (req, res, next) => {
  try {
    num_product = await Product.count({});
    // if (num_user !== 0) return res.redirect("/");
    console.log("Starting generate...");
    let fakeProducts = await createProducts(20);
    // console.log(fakeProducts[0]);
    const result = await Product.insertMany(fakeProducts);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
});

module.exports = router;
