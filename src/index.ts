import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    // automatically run migrations
    await orm.getMigrator().up()

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),

        // unique object that is accessible to all resolvers
        context: () => ({ em: orm.em })
    });
    await apolloServer.start();

    // creates graphql endpoint on express
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Server started on localhost:4000...");
    });

    // Create a Post
    // const post = orm.em.fork({}).create(Post, {
    //     title: "my first post",
    // });
    // await orm.em.fork({}).persistAndFlush(post);
}

main().catch((err) => {
    console.error(err);
});