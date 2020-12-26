const Payment = require("../../models/payment");

module.exports = {
  Query: {
    payment: async (root, args, context) => {
      const { paymentId } = args;

      if (!paymentId) throw new Error("Not allowed!");

      return await Payment.findOne({ _id: paymentId });
    },
  },
  Mutation: {},
  Payment: {
    async __resolveReference(object) {
      return await Payment.findOne({ _id: object.id });
    },
    user(payment) {
      return { __typename: "User", id: payment.userId };
    },
    order(payment) {
      return { __typename: "Order", id: payment.orderId };
    },
  },
  User: {
    async payments(user) {
      return await Payment.find({ userId: user.id });
    },
  },
};
