const mongoose = require("mongoose");
const DB = require("../config/db");

const { Schema } = mongoose;

const PRODUCT_SCHEMA = new Schema(
  {
    name: String,
    originalPrice: Number,
    discountedPrice: Number,
    sellerId: Schema.Types.ObjectId,
  },
  {
    collection: "products",
    timestamps: true,
  }
);

const Product = DB.model("Product", PRODUCT_SCHEMA);

module.exports = Product;
