const { gql } = require("apollo-server");

module.exports = gql`
  type Product @key(fields: "id") {
    id: ID
    name: String
    originalPrice: Int
    discountedPrice: Int
  }
`;
