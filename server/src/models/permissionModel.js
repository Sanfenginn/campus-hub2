const { Schema, model } = require("mongoose");

const permissionSchema = new Schema({
  permission: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model("Permission", permissionSchema);
