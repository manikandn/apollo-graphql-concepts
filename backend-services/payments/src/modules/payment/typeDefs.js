const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    payment(paymentId: ID!): Payment
  }

  type Payment @key(fields: "id") {
    id: ID
    user: User
    order: Order
  }

  extend type User @key(fields: "id") {
    id: ID @external
    payments: [Payment]
  }
  extend type Order @key(fields: "id") {
    id: ID @external
  }
`;
