module.exports.about = (req, res, next) => {
  res.render("./default/index", {
    title: "Homepage",
    body: "../../views/about/about",
  });
};
