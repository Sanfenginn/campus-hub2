const { Mongoose, model } = require("mongoose");

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

module.exports = model("Admin", adminSchema);
