// import { Schema, model } from "mongoose";

// const userSchema = new Schema({
//   name: {
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     _id: false,
//   },
//   dob: {
//     type: Date,
//     required: true,
//     set: (value: string | Date) => {
//       if (typeof value === "string") {
//         return new Date(value);
//       }
//       return value;
//     },
//   },
//   account: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     // required: true,
//   },
//   role: {
//     userType: {
//       type: String,
//       enum: ["student", "teacher", "admin"],
//       required: true,
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       refPath: "role.userTypeRef",
//     },
//     roleInfo: { type: Schema.Types.ObjectId, ref: "Role" },
//     _id: false,
//   },
//   contact: {
//     email: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     _id: false,
//   },
//   address: {
//     houseNumber: {
//       type: String,
//     },
//     street: {
//       type: String,
//     },
//     suburb: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     state: {
//       type: String,
//     },
//     country: {
//       type: String,
//     },
//     postalCode: {
//       type: String,
//     },
//     _id: false,
//   },
// });

// // 动态设置引用的路径
// userSchema.virtual("role.userTypeRef").get(function () {
//   return this.role.userType === "student"
//     ? "Student"
//     : this.role.userType === "teacher"
//     ? "Teacher"
//     : this.role.userType === "admin"
//     ? "Admin"
//     : null;
// });

// export const User = model("User", userSchema);

import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  name: {
    firstName: string;
    lastName: string;
  };
  dob: Date;
  account: string;
  password: string;
  role: {
    userType: "student" | "teacher" | "admin";
    userId?: mongoose.Types.ObjectId;
    roleInfo: mongoose.Types.ObjectId;
  };
  contact: {
    email: string;
    phone: string;
  };
  address: {
    houseNumber?: string;
    street?: string;
    suburb?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
}

const userSchema = new Schema<UserDocument>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    _id: false,
  },
  dob: {
    type: Date,
    required: true,
  },
  account: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
    houseNumber: String,
    street: String,
    suburb: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    _id: false,
  },
});

// 动态设置引用的路径
userSchema.virtual("role.userTypeRef").get(function () {
  return this.role.userType === "student"
    ? "Student"
    : this.role.userType === "teacher"
    ? "Teacher"
    : this.role.userType === "admin"
    ? "Admin"
    : null;
});

export const User = mongoose.model<UserDocument>("User", userSchema);
