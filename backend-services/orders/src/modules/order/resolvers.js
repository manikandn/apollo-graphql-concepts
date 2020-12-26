const Order = require("../../models/order");

module.exports = {
  Query: {
    order: async (root, args, context) => {
      console.log("Query.order", args);
      const { orderId } = args;

      if (!orderId) throw new Error("Not allowed!");

      return await Order.findOne({ _id: orderId });
    },
  },
  Mutation: {},
  Order: {
    user(order) {
      return { __typename: "User", id: order.userId };
    },
    billingAddress(order) {
      return { __typename: "UserAddress", id: order.billingAddressId };
    },
    shipmentAddress(order) {
      return { __typename: "UserAddress", id: order.shipmentAddressId };
    },
  },
  OrderCart: {
    product(cart) {
      return { __typename: "Product", id: cart.productId };
    },
  },
};
