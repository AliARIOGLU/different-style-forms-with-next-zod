import { z } from "zod";
import StepOne from "../components/step-one";
import StepTwo from "../components/step-two";
import StepThree from "../components/step-three";

export const stepOneSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
});

export type StepOneSchema = z.infer<typeof stepOneSchema>;

export const stepTwoSchema = z.object({
  email: z.string().email(),
});

export type StepTwoSchema = z.infer<typeof stepTwoSchema>;

export const stepThreeSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type StepThreeSchema = z.infer<typeof stepThreeSchema>;

// main schema

export const multiStepFormSchema = z.object({
  stepOne: stepOneSchema,
  stepTwo: stepTwoSchema,
  stepThree: stepThreeSchema,
});

export type MultiStepFormSchema = z.infer<typeof multiStepFormSchema>;

export const components = {
  1: StepOne,
  2: StepTwo,
  3: StepThree,
} as const;

export type Steps = keyof typeof components;
