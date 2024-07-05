import { buildSchemaSync } from "type-graphql";
import Auth from "./entities/auth/schema"; // 假设 Auth 是其中一个 schema

const schema = buildSchemaSync({
  resolvers: [Auth], // 这里列出你的所有 resolver
});

export default schema;
