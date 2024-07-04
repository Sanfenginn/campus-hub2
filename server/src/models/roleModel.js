const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  role: {
    type: String,
    required: true,
    _id: false,
  },
  permissions: [
    {
      // type: String,
      type: Schema.Types.ObjectId, // 修改为 ObjectId 类型
      ref: "Permission", // 参考 Permission 模型
      required: true,
      _id: false,
    },
  ],
});

module.exports = model("Role", roleSchema);
