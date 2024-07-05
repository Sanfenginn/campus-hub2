"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const resolvers_1 = __importDefault(require("./entities/user/resolvers"));
const resolvers_2 = __importDefault(require("./entities/product/resolvers"));
const resolvers = (0, lodash_1.merge)({}, resolvers_1.default, resolvers_2.default);
exports.default = resolvers;
