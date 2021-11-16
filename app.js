const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const aboutRouter = require("./routes/about");
const shopRouter = require("./routes/shop");
const contactRouter = require("./routes/contact");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const thankyouRoter = require("./routes/thankyou");
const detailRouter = require("./routes/detail");
const forgotpasswordRouter = require("./routes/forgotpassword");

const app = express();
dotenv.config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/shop", shopRouter);
app.use("/contact", contactRouter);
app.use("/cart", cartRouter);
app.use("/users", usersRouter);
app.use("/checkout", checkoutRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/thankyou", thankyouRoter);
app.use("/detail", detailRouter);
app.use("/forgotpassword", forgotpasswordRouter);

if (process.env.DEBUG) {
  const generate = require("./test/generate");
  app.use("/upload", generate);
} else {
  console.log("no debug mode");
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



// connect to database
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("DB Connected")
);

module.exports = app;
