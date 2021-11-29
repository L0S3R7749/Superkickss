const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');

require('dotenv').config();


const indexRouter = require("./component/homepage");
const aboutRouter = require("./component/about");
const contactRouter = require("./component/contact");
const shopRouter = require("./component/product")

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/about",aboutRouter);
app.use("/contact",contactRouter);
app.use("/product", shopRouter);

if (process.env.DEBUG) {
  const generate = require("./test/generate");
  app.use("/generate-fake-data", generate);
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
mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("Connection Error", error));

module.exports = app;
