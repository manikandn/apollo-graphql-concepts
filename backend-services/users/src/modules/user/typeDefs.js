const { gql } = require("apollo-server");

module.exports = gql`
  scalar JSON

  extend type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID
    name: String
    username: String
    addresses: [UserAddress]
    paymentMethods: [UserPaymentMethod]
  }

  type UserAddress @key(fields: "id") {
    id: ID
    buildingNumber: String
    street: String
    area: String
    district: String
    state: String
    country: String
    pincode: String
  }

  type UserPaymentMethod {
    id: ID
    type: String
    data: JSON
  }
`;
