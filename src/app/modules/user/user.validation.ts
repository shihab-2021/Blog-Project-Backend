import { z } from 'zod';

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required!',
    })
    .min(3)
    .max(50),
  email: z
    .string({
      required_error: 'Email is required!',
    })
    .email(),
  password: z
    .string({
      required_error: 'Password is required!',
    })
    .max(20, "Password can't be more than 20 character!"),
  role: z
    .enum(['admin', 'user'], {
      invalid_type_error: 'Please enter a valid role!',
    })
    .optional()
    .default('user'),
  phone: z.string().optional().nullable().default(null),
  address: z.string().optional().nullable().default(null),
});

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required!' }).email(),
  password: z.string({ required_error: 'Password is required!' }),
});

export const userValidations = { userValidationSchema, loginValidationSchema };
