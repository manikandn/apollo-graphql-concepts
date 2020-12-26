const mongoose = require("mongoose");
const DB = require("../config/db");

const { Schema } = mongoose;

const USER_ADDRESS_SCHEMA = new Schema({
  buildingNumber: String,
  street: String,
  area: String,
  district: String,
  state: String,
  country: String,
  pincode: String,
});

const USER_PAYMENT_METHODS_SCHEMA = new Schema({
  type: String,
  data: Object,
});

const USER_SCHEMA = new Schema(
  {
    name: String,
    username: String,
    addresses: [USER_ADDRESS_SCHEMA],
    paymentMethods: [USER_PAYMENT_METHODS_SCHEMA],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = DB.model("User", USER_SCHEMA);

module.exports = User;
