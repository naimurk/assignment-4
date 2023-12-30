"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidation = zod_1.z.object({
    username: zod_1.z.string().min(3).max(30),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/),
    role: zod_1.z.enum(['user', 'admin']),
});
exports.default = userValidation;
