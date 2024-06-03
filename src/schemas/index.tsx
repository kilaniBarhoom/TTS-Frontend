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
export const ProjectFormSchema = z.object({
  name: z.string().min(1, t("Name is required")),
  description: z.string().min(1, t("Description is required")),
  startDate: z
    .date({
      required_error: "Start date is required",
    })
    .refine((date) => {
      return date >= new Date();
    }, "Start date cannot be in the past"),

  endDate: z
    .date({
      required_error: "End date is required",
    })
    .refine((date) => {
      return date > new Date();
    }, "End date must be in the future"),
  projectStatus: z.string().min(1, t("Project status is required")),
});

export type ProjectFormSchemaType = z.infer<typeof ProjectFormSchema>;
// shecma for ticket creation

//schema for memer addition
export const addMemberSchema = z.object({
  email: z.string().email().min(1, t("Email is required")),
});

export type AddMemberSchemaType = z.infer<typeof addMemberSchema>;

export const TicketFormSchema = z.object({
  name: z.string().min(1, t("Name is required")),
  description: z.string().min(1, t("Description is required")),
  startDate: z.any({
    required_error: "Start date is required",
  }),
  dueDate: z.any({
    required_error: "Due date is required",
  }),
  ticketStatus: z.string().min(1, t("Ticket status is required")),
  ticketPriority: z.string().min(1, t("Ticket priority is required")),
  projectId: z.string().min(1, t("Project is required")),
  assigneeId: z.string().min(1, t("Assignee is required")),
  parentTicketId: z.string().nullable(),
});

export type TicketFormSchemaType = z.infer<typeof TicketFormSchema>;

export const CommentFormSchema = z.object({
  content: z.string().min(1, t("Comment is required")),
});

export type CommentFormSchemaType = z.infer<typeof CommentFormSchema>;
