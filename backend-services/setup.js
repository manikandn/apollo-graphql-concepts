require("./users/src/config/db");
require("./orders/src/config/db");
require("./products/src/config/db");
const User = require("./users/src/models/user");
const Order = require("./orders/src/models/order");
const Product = require("./products/src/models/product");

main();

async function main() {
  const user1 = {
    name: "Mani",
    username: "@mani",
    addresses: [
      {
        buildingNumber: "1",
        street: "main road",
        area: "chennai",
        district: "chennai",
        state: "TN",
        country: "IN",
        pincode: "600000",
      },
      {
        buildingNumber: "2",
        street: "main road",
        area: "chennai",
        district: "chennai",
        state: "TN",
        country: "IN",
        pincode: "600000",
      },
      {
        buildingNumber: "3",
        street: "main road",
        area: "chennai",
        district: "chennai",
        state: "TN",
        country: "IN",
        pincode: "600000",
      },
    ],
    paymentMethods: [
      {
        type: "upi",
        data: {
          upiAddress: "mani@upi",
        },
      },
      {
        type: "card",
        data: {
          cardNumber: "1234 5678 1234 5678",
        },
      },
    ],
  };
  const user2 = {
    name: "Chinna",
    username: "@chinna",
    addresses: [
      {
        buildingNumber: "101",
        street: "main road",
        area: "chennai",
        district: "chennai",
        state: "TN",
        country: "IN",
        pincode: "600000",
      },
      {
        buildingNumber: "102",
        street: "main road",
        area: "chennai",
        district: "chennai",
        state: "TN",
        country: "IN",
        pincode: "600000",
      },
      {
        buildingNumber: "103",
        street: "main road",
        area: "chennai",
        district: "chennai",
        state: "TN",
        country: "IN",
        pincode: "600000",
      },
    ],
    paymentMethods: [
      {
        type: "upi",
        data: {
          upiAddress: "chinna@upi",
        },
      },
      {
        type: "card",
        data: {
          cardNumber: "4321 8765 4321 8765",
        },
      },
    ],
  };

  const user3 = {
    name: "Seller",
    username: "@seller",
    addresses: [],
    paymentMethods: [],
  };

  let users = await User.insertMany([user1, user2, user3]);
  let user1Doc = users.find((_u) => _u.username == user1.username);
  let user2Doc = users.find((_u) => _u.username == user2.username);
  let user3Doc = users.find((_u) => _u.username == user3.username);

  const productsData = [
    {
      name: "Motorola",
      originalPrice: 100,
      discountedPrice: 80,
      sellerId: user3Doc._id,
    },
    {
      name: "iPhone",
      originalPrice: 1000,
      discountedPrice: 900,
      sellerId: user3Doc._id,
    },
    {
      name: "Nokia",
      originalPrice: 80,
      discountedPrice: 60,
      sellerId: user3Doc._id,
    },
  ];

  let products = await Product.insertMany(productsData);
  let product1Doc = products.find((_p) => _p.name == products[0].name);
  let product2Doc = products.find((_p) => _p.name == products[1].name);
  let product3Doc = products.find((_p) => _p.name == products[2].name);

  const user1Orders = [
    {
      userId: user1Doc._id,
      billingAddressId: user1Doc.addresses[0]._id,
      shipmentAddressId: user1Doc.addresses[1]._id,
      cart: [
        {
          productId: product1Doc._id,
          originalPrice: product1Doc.originalPrice,
          discountedPrice: product1Doc.discountedPrice,
        },
      ],
    },
    {
      userId: user1Doc._id,
      billingAddressId: user1Doc.addresses[0]._id,
      shipmentAddressId: user1Doc.addresses[2]._id,
      cart: [
        {
          productId: product2Doc._id,
          originalPrice: product2Doc.originalPrice,
          discountedPrice: product2Doc.discountedPrice,
        },
      ],
    },
  ];

  const user2Orders = [
    {
      userId: user2Doc._id,
      billingAddressId: user2Doc.addresses[0]._id,
      shipmentAddressId: user2Doc.addresses[1]._id,
      cart: [
        {
          productId: product1Doc._id,
          originalPrice: product1Doc.originalPrice,
          discountedPrice: product1Doc.discountedPrice,
        },
      ],
    },
    {
      userId: user2Doc._id,
      billingAddressId: user2Doc.addresses[0]._id,
      shipmentAddressId: user2Doc.addresses[2]._id,
      cart: [
        {
          productId: product3Doc._id,
          originalPrice: product3Doc.originalPrice,
          discountedPrice: product3Doc.discountedPrice,
        },
      ],
    },
  ];

  await Order.insertMany(user1Orders);
  await Order.insertMany(user2Orders);
}
