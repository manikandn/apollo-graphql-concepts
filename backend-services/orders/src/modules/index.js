const { gql } = require("apollo-server");
const { merge } = require("lodash");
const OrderModule = require("./order");

module.exports = {
  typeDefs: gql`
    ${OrderModule.typeDefs}
  `,
  resolvers: merge(OrderModule.resolvers),
};
