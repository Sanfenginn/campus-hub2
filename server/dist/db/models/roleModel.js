"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
        _id: false,
    },
    permissions: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Permission",
            required: true,
            _id: false,
        },
    ],
});
const Role = (0, mongoose_1.model)("Role", roleSchema);
exports.default = Role;
