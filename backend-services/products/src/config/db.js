require("dotenv").config();
const mongoose = require("mongoose");
const mongoDbUrl = "mongodb://localhost:27017/apollo-graphql-gateway-advanced";

const dbConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.set("debug", true);

const databaseConnection = mongoose.createConnection(
  mongoDbUrl,
  dbConnectionOptions
);

databaseConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error!")
);

databaseConnection.once("open", () => {
  console.log("Connected to Database!");
});

module.exports = databaseConnection;
