import { z } from "zod";

export const Login = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .min(1, { error: "Email is required" })
    .email({ error: "Enter a valid email address" }),

  password: z
    .string({ error: "Password is required" })
    .min(1, { error: "Password is required" }),
});

export const Register = z.object({
  fullname: z
    .string({ error: "Full name is required" })
    .trim()
    .min(2, { error: "Enter at least 2 characters" })
    .max(100, { error: "Name cannot exceed 100 characters" }),

  email: z
    .string({ error: "Email is required" })
    .trim()
    .email({ error: "Enter a valid email address" }),

  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters" })
    .max(100, { error: "Password cannot exceed 100 characters" }),
});