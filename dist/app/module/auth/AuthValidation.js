"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const registerValidation = zod_1.z.object({
    username: zod_1.z.string().min(3).max(30),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    role: zod_1.z.enum(['user']),
});
const loginValidation = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
const changePasswordValidation = zod_1.z.object({
    currentPassword: zod_1.z.string(),
    newPassword: zod_1.z.string()
});
exports.authValidation = {
    registerValidation,
    loginValidation,
    changePasswordValidation,
};
