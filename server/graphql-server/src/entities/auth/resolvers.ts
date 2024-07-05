import Auth from "./schema";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Subscription,
  Root,
} from "type-graphql";
import { pubSub } from "../../pubSub";
import { User } from "../../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../../config";

interface UserInput {
  role: {
    _id?: string;
    userType: string;
    userId?: string;
    roleInfo: string;
  };
  dob: Date;
  account: string;
  password: string;
}

@Resolver(() => Auth)
export default class AuthResolver {
  @Query(() => String)
  hello() {
    return "Hello, world!";
  }

  @Mutation((returns) => Auth, { nullable: true })
  async login(
    @Arg("account", (type) => String) account: string,
    @Arg("password", (type) => String) password: string
  ): Promise<Auth | null> {
    try {
      const userDoc = await User.findOne({ account: account })
        .populate("role")
        .exec();

      console.log("userDoc: ", userDoc);

      if (!userDoc) {
        throw new Error("User not found");
      }

      // 将 Mongoose 文档转换为 UserInput 类型
      const user: UserInput = {
        role: {
          userType: userDoc.role.userType,
          userId: userDoc.role.userId?.toString(),
          roleInfo: userDoc.role.roleInfo.toString(),
        },
        dob: userDoc.dob,
        account: userDoc.account,
        password: userDoc.password,
      };

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error("Password is incorrect");
      }

      const token = jwt.sign(
        { age: user.dob, roleId: user.role._id },
        config.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const authResponse = new Auth();
      authResponse.account = user.account;
      authResponse.token = token;
      authResponse.userType = user.role.userType;

      return authResponse;
    } catch (error) {
      console.error("Error in login mutation:", error);
      throw error;
    }
  }
}
