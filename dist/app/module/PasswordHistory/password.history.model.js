"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHistory = void 0;
const mongoose_1 = require("mongoose");
const PasswordHistorySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    password: {
        type: String, required: true
    },
    timeStamp: {
        type: Date, default: Date.now(),
    }
});
exports.PasswordHistory = (0, mongoose_1.model)('PasswordHistory', PasswordHistorySchema);
