import { Schema, model, Document, Types } from "mongoose";

interface IRole extends Document {
  role: string;
  permissions: Types.ObjectId[];
}

const roleSchema = new Schema<IRole>({
  role: {
    type: String,
    required: true,
    _id: false,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
      _id: false,
    },
  ],
});

const Role = model<IRole>("Role", roleSchema);

export default Role;
