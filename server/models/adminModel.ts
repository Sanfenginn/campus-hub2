import { Schema, model } from "mongoose";

const adminSchema = new Schema({
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
});

export const Admin = model("Admin", adminSchema);
