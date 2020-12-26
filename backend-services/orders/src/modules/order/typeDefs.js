const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    order(orderId: ID!): Order
  }

  type Order @key(fields: "id") {
    id: ID
    user: User
    cart: [OrderCart]
    billingAddress: UserAddress
    shipmentAddress: UserAddress
  }

  type OrderCart {
    product: Product
    originalPrice: Int
    discountedPrice: Int
  }

  extend type Product @key(fields: "id") {
    id: ID @external
  }
  extend type User @key(fields: "id") {
    id: ID @external
  }
  extend type UserAddress @key(fields: "id") {
    id: ID @external
  }
`;
