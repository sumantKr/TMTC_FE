import * as z from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    username: z.string().min(1, "Username is required").optional().or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.email?.trim() || data.username?.trim(), {
    message: "Email or Username is required",
    path: ["username"], // Can be "username" if you prefer to highlight that field
  });

export type LoginSchema = z.infer<typeof loginSchema>;