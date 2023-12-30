"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    passwordChangedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.set("password", undefined);
        doc.set("passwordChangedAt", undefined);
        next();
    });
});
// userSchema.post("findOne", async function (doc , next){
//   doc.set("password", undefined);
//   doc.set("passwordChangedAt", undefined);
//  next()
// })
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
