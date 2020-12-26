const { gql } = require("apollo-server");
const { merge } = require("lodash");
const PaymentModule = require("./payment");

module.exports = {
  typeDefs: gql`
    ${PaymentModule.typeDefs}
  `,
  resolvers: merge(PaymentModule.resolvers),
};
