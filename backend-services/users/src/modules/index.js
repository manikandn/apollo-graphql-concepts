const { gql } = require("apollo-server");
const { merge } = require("lodash");
const GraphQLJSON = require("graphql-type-json");
const UserModule = require("./user");

module.exports = {
  typeDefs: gql`
    ${UserModule.typeDefs}
  `,
  resolvers: merge({ JSON: GraphQLJSON }, UserModule.resolvers),
};
