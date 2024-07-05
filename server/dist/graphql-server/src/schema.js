"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
// import usersTypeDefs from "./entities/users/schema";
// import teachersTypeDefs from "./entities/teachers/schema";
// import studentsTypeDefs from "./entities/students/schema";
// import coursesTypeDefs from "./entities/courses/schema";
// import studentClassesTypeDefs from "./entities/studentClasses/schema";
const schema_1 = __importDefault(require("./entities/auth/schema"));
const baseTypeDefs = (0, apollo_server_1.gql) `
  type Query
  type Mutation
`;
const typeDefs = [
    // teachersTypeDefs,
    // studentsTypeDefs,
    // coursesTypeDefs,
    // studentClassesTypeDefs,
    // usersTypeDefs,
    schema_1.default,
];
exports.default = typeDefs;
