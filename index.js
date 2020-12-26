const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

const { v4: uuidV4 } = require("uuid");

class GatewayIntruder extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    console.log("context", context);
    if (!request.query.includes("GetServiceDefinition")) {
      request.http.headers.set("x-userid", context.userId);
      request.http.headers.set("x-authorization", context.Authorization);
      request.http.headers.set("x-transactionid", context.transactionId);
    }
  }
}

const gateway = new ApolloGateway({
  serviceList: [
    { name: "users", url: "http://localhost:3011/graphql" },
    { name: "orders", url: "http://localhost:3012/graphql" },
    { name: "products", url: "http://localhost:3013/graphql" },
  ],
  buildService: ({ url }) => new GatewayIntruder({ url }),

  // Experimental: Enabling this enables the query plan view in Playground.
  __exposeQueryPlanExperimental: false,
});

(async () => {
  const server = new ApolloServer({
    path: "/graphql",
    uploads: false,
    engine: false,
    subscriptions: false,
    gateway,
    context: ({ req }) => {
      const Authorization = req.headers.authorization;
      const userId = Authorization.split("Bearer ")[1];
      const transactionId = uuidV4();

      const context = {
        userId,
        transactionId,
        Authorization,
      };

      console.log(`Gateway request start for ${transactionId}`, context);

      return context;
    },
  });

  server.listen({ port: 3010 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
