import i18next from "i18next";
import * as z from "zod";
const { t } = i18next;

export const loginSchema = z.object({
  email: z.string().min(1, t("Email is required")),
  password: z.string().min(8, t("Password must be at least 8 characters")),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, t("Name is required")),
  email: z.string().email().min(1, t("Email is required")),
  password: z
    .string()
    .min(8, t("Password must be at least 8 characters"))
    .refine((password) => {
      const conditions = {
        hasUppercase: /[A-Z]/.test(password),
        hasSpecialCharacter: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
          password
        ),
        hasNumber: /\d/.test(password),
      };
      return (
        conditions.hasUppercase &&
        conditions.hasSpecialCharacter &&
        conditions.hasNumber
      );
    }, "Password must have at least one uppercase letter, one special character, and one number"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

// schema for project creation
// shecma for ticket creation
