const { gql } = require("apollo-server");
const { merge } = require("lodash");
const ProductModule = require("./product");

module.exports = {
  typeDefs: gql`
    ${ProductModule.typeDefs}
  `,
  resolvers: merge(ProductModule.resolvers),
};
