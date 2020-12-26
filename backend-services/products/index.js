require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const { typeDefs, resolvers } = require("./src/modules");

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
  context: (data) => {
    let { req } = data;

    const context = {
      userId: req.headers["x-userid"],
      Authorization: req.headers["x-authorization"],
      transactionId: req.headers["x-transactionid"],
    };

    console.log("BACKEND-SERVICE #PRODUCTS - START with context", context);
    return context;
  },
});

server.listen({ port: 3013 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
