import { z } from "zod";

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[0-9]/, "Password must contain a number");

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password,
  phone: z.string().optional(),
  company: z.string().optional(),
  businessType: z.string().optional(),
  country: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  purpose: z.enum(["verify", "reset"]).default("verify"),
});

export const resendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  purpose: z.enum(["verify", "reset"]).default("verify"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  password,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: password,
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  businessType: z.string().optional(),
  country: z.string().optional(),
  avatar: z.string().optional(),
});

export const inventorySchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  quantity: z.coerce.number().int().min(0).default(0),
  warehouse: z.string().optional(),
  unitPrice: z.coerce.number().min(0).optional(),
  status: z.enum(["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"]).optional(),
});

export const accountSchema = z.object({
  accountName: z.string().min(1),
  accountType: z.enum(["CUSTOMER", "VENDOR", "PARTNER"]).default("CUSTOMER"),
  contactEmail: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const chartMainSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  nature: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
});

export const chartGeneralSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  mainAccountId: z.string().min(1),
  isActive: z.coerce.boolean().optional(),
});

export const accountEntrySchema = z.object({
  description: z.string().optional(),
  debit: z.coerce.number().min(0).default(0),
  credit: z.coerce.number().min(0).default(0),
  entryDate: z.coerce.date().optional(),
  accountId: z.string().optional(),
  generalAccountId: z.string().optional(),
});

export const reportSchema = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  format: z.enum(["PDF", "XLSX"]).default("PDF"),
  data: z.any().optional(),
});

export const setupSchema = z.object({
  companyName: z.string().optional(),
  registrationNo: z.string().optional(),
  businessEmail: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  notifications: z.coerce.boolean().optional(),
  twoFactor: z.coerce.boolean().optional(),
  autoDarkMode: z.coerce.boolean().optional(),
});

export const settingsSchema = z.object({
  emailNotifications: z.coerce.boolean().optional(),
  systemNotifications: z.coerce.boolean().optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  privacyAnalytics: z.coerce.boolean().optional(),
  twoFactorEnabled: z.coerce.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
