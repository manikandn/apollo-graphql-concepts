const mongoose = require("mongoose");
const DB = require("../config/db");

const { Schema } = mongoose;

const CART_SCHEMA = new Schema({
  productId: Schema.Types.ObjectId,
  originalPrice: Number,
  discountedPrice: Number,
});

const ORDER_SCHEMA = new Schema(
  {
    userId: Schema.Types.ObjectId,
    billingAddressId: Schema.Types.ObjectId,
    shipmentAddressId: Schema.Types.ObjectId,
    paymentId: Schema.Types.ObjectId,
    cart: [CART_SCHEMA],
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

const Order = DB.model("Order", ORDER_SCHEMA);

module.exports = Order;
