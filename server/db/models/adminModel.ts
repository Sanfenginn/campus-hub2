import { Schema, model, Document } from "mongoose";

// 定义接口来表示 Admin 文档
interface IAdmin extends Document {
  name: {
    firstName: string;
    lastName: string;
  };
}

// 创建 Admin 模式
const adminSchema = new Schema<IAdmin>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    _id: false, // 禁用 _id 创建
  },
});

// 创建 Admin 模型
const Admin = model<IAdmin>("Admin", adminSchema);

export default Admin;
