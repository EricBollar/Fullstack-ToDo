import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"), 
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post],
    dbName: "forumdb",
    user: "postgres",
    password: "postgres",
    type: "postgresql",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];