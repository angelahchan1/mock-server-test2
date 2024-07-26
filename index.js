import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const app = express();
  app.use(cors());
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
    playground: true,
    introspection: true,
  });
  apolloServer.applyMiddleware({ path: "graphql", app });
  app.listen(8080, () => {
    console.log("server started");
  });
};
main();
