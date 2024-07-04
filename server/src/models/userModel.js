const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    _id: false,
  },
  dob: {
    type: Date,
    required: true,
    set: (value) => {
      if (typeof value === "string") {
        return new Date(value);
      }
      return value;
    },
  },
  account: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  role: {
    userType: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      refPath: "role.userTypeRef",
    },
    roleInfo: { type: Schema.Types.ObjectId, ref: "Role" },
    _id: false,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    _id: false,
  },
  address: {
    houseNumber: {
      type: String,
    },
    street: {
      type: String,
    },
    suburb: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String,
    },
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

module.exports = model("User", userSchema);
