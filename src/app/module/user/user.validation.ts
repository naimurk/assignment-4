import { z } from 'zod';

const userValidation = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/),
  role: z.enum(['user', 'admin']),
});

export default userValidation;