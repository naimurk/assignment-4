import { z } from 'zod';

const registerValidation= z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['user']),
});

const loginValidation= z.object({
  
  username: z.string(),
  password: z.string()
});
const changePasswordValidation= z.object({
  currentPassword: z.string(),
  newPassword: z.string()
});

export const authValidation = {
registerValidation,
loginValidation,
changePasswordValidation,
}