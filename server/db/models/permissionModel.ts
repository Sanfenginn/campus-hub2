import { Schema, model, Document } from "mongoose";

interface IPermission extends Document {
  permission: string;
}

const permissionSchema = new Schema<IPermission>({
  permission: {
    type: String,
    required: true,
    unique: true,
  },
});

const Permission = model<IPermission>("Permission", permissionSchema);

export default Permission;
