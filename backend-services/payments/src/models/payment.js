const mongoose = require("mongoose");
const DB = require("../config/db");

const { Schema } = mongoose;

const PAYMENT_SCHEMA = new Schema(
  {
    userId: Schema.Types.ObjectId,
    orderId: Schema.Types.ObjectId,
  },
  {
    collection: "payments",
    timestamps: true,
  }
);

const Payment = DB.model("Payment", PAYMENT_SCHEMA);

module.exports = Payment;
