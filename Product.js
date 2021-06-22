const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
