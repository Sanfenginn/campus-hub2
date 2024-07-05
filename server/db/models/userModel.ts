import { Schema, model, Document, Types } from "mongoose";

interface IName {
  firstName: string;
  lastName: string;
}

interface IRole {
  userType: "student" | "teacher" | "admin";
  userId: Types.ObjectId;
  roleInfo: Types.ObjectId;
}

interface IContact {
  email: string;
  phone: string;
}

interface IAddress {
  houseNumber?: string;
  street?: string;
  suburb?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface IUser extends Document {
  name: IName;
  dob: Date;
  account: string;
  password?: string;
  role: IRole;
  contact: IContact;
  address?: IAddress;
}

const userSchema = new Schema<IUser>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    _id: false,
  },
  dob: {
    type: Date,
    required: true,
    set: (value: any) => {
      if (typeof value === "string") {
        return new Date(value);
      }
      return value;
    },
  },
  account: { type: String, required: true },
  password: { type: String },
  role: {
    userType: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, refPath: "role.userTypeRef" },
    roleInfo: { type: Schema.Types.ObjectId, ref: "Role" },
    _id: false,
  },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    _id: false,
  },
  address: {
    houseNumber: { type: String },
    street: { type: String },
    suburb: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    _id: false,
  },
});

// 动态设置引用的路径
userSchema.virtual("role.userTypeRef").get(function (this: IUser) {
  return this.role.userType === "student"
    ? "Student"
    : this.role.userType === "teacher"
    ? "Teacher"
    : this.role.userType === "admin"
    ? "Admin"
    : null;
});

const User = model<IUser>("User", userSchema);

export default User;
