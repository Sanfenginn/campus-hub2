import { Schema, model } from "mongoose";

const permissionSchema = new Schema({
  permission: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Permission = model("Permission", permissionSchema);
