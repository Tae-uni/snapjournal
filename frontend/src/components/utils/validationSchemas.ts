import { z } from "zod";

export const formSchema = z.object({
  username: z.string()
    .min(3, { message: "Min 3 characters" })
    .max(20, { message: "Max 20 characters" }).trim(),
  email: z.string()
    .email('Enter a valid email.').trim(),
  password: z.string()
    .min(6, { message: "Min 6 characters" })
    .regex(/[A-Za-z]/, { message: "Password must contain a letter" })
    .regex(/[0-9]/, { message: 'Password must contain a number.' })
    .max(30, { message: "Max 30 characters" }).trim(),
});

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, { message: "Min 6 characters" })
    .regex(/[A-Za-z]/, { message: "Password must contain a letter" })
    .regex(/[0-9]/, { message: 'Password must contain a number.' })
    .max(30, { message: "Max 30 characters" }).trim(),
  token: z.string()
});