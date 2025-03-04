const express = require('express');
const {ApolloServer} = require("@apollo/server");
const {expressMiddleware} = require("@apollo/server/express4");
const cors = require("cors");
const searchRoutes = require("./src/controllers/searchController");
const typeDefs = require("./src/graphql/schema");
const bodyParser = require("body-parser");
const resolvers = require("./src/graphql/resolver");

async function startServer() {
  try {
    const app = express();
    app.use("/search", searchRoutes);

    const server = new ApolloServer({ typeDefs, resolvers });

    app.use(cors({origin : "*"}));
    app.use(express.json());
    app.use(bodyParser.json());
    
    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(9000, () => console.log("The server is running on port 9000"));
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();