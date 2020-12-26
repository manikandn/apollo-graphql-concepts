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
    async __resolveReference(object) {
      return await Order.findOne({ _id: object.id });
    },
    user(order) {
      return { __typename: "User", id: order.userId };
    },
    billingAddress(order) {
      return { __typename: "UserAddress", id: order.billingAddressId };
    },
    shipmentAddress(order) {
      return { __typename: "UserAddress", id: order.shipmentAddressId };
    },
    payment(order) {
      return { __typename: "Payment", id: order.paymentId };
    },
  },
  OrderCart: {
    product(cart) {
      return { __typename: "Product", id: cart.productId };
    },
  },
  User: {
    async orders(user) {
      return await Order.find({ userId: user.id });
    },
  },
};
