import "reflect-metadata";
import lodash from "lodash";
import userResolvers from "./entities/auth/resolvers";

const resolvers = lodash.merge({}, userResolvers);

export default resolvers;
