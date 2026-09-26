import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2, "Name must contain at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  role: z.enum(["patient", "caregiver"]),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type loginInput = z.infer<typeof loginSchema>;
