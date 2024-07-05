"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const permissionSchema = new mongoose_1.Schema({
    permission: {
        type: String,
        required: true,
        unique: true,
    },
});
const Permission = (0, mongoose_1.model)("Permission", permissionSchema);
exports.default = Permission;
