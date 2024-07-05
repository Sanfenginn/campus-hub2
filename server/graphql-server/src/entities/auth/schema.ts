import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class Auth {
  @Field((type) => String, { nullable: true })
  token?: string;

  @Field((type) => String)
  account!: string;

  @Field((type) => String)
  password!: string;

  @Field((type) => String)
  userType!: string;
}
