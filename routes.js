const express = require("express");
const router = express.Router();
// Load User model
const User = require("./User");
const Product = require("./Product");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  res.render("products/list", { title: "Products In DB", products });
});

router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  res.render("cart", { cart });
});

module.exports = router;

/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("users/register");
});
router.get("/login", function (req, res, next) {
  res.render("users/login");
});
router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/login");
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) return res.redirect("/login");
  req.session.user = user;
  return res.redirect("/");
});
router.post("/register", async function (req, res, next) {
  let user = new User(req.body);
  await user.save();
  res.redirect("/");
});

var checkSessionAuth = require("./middlewares/checkSessionAuth");
/* GET home page. */

router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("products/add");
});
// store data in db
router.post("/add", async function (req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});
router.get("/cart/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("Add This Product in cart");
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/products");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});
router.post("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.redirect("/products");
});

module.exports = router;
