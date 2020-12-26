const Product = require("../../models/product");

module.exports = {
  Query: {},
  Mutation: {},
  Product: {
    async __resolveReference(object) {
      return await Product.findOne({ _id: object.id });
    },
  },
};
