import * as z from "zod";


export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Enter the name" }),
  username: z.string().min(2, { message: "Enter the username" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 characters" }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 characters"}),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

export const PostValidation = z.object({
  file: z.custom<File[]>(),
  caption: z.string().min(5).max(2200),
  location: z.string().min(2).max(100),
  tags: z.string(),
});
