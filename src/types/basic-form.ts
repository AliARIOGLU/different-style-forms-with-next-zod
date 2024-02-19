import { z } from "zod";

export const formSchema = z.object({
  username: z.string().trim().min(3, "Too short").max(20, "Too long"),
  password: z
    .string()
    .min(8, "Too short")
    .regex(/[0-9]/, "Must contain a number"),
  email: z.string().email("Invalid email"),
});

export type FormSchema = z.infer<typeof formSchema>;
