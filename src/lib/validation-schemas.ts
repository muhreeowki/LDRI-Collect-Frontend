import { z } from 'zod';

export const emailSchema = z
  .string()
  .email({ message: 'Invalid email address' });

export const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long' })
  .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' });

export const nameSchema = z
  .string()
  .min(2, { message: 'Name must be at least 2 characters long' });

export const phoneSchema = z
  .string()
  .min(10, { message: 'Phone number must be valid' });

export const messageSchema = z
  .string()
  .min(10, { message: 'Message must be at least 10 characters long' });

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
});

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const delegateSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  department: z
    .string()
    .min(1, 'Department is required')
    .max(50, 'Department must be less than 50 characters'),
});

export const delegateListSchema = z.object({
  delegates: z
    .array(delegateSchema)
    .min(1, 'At least one delegate is required'),
});

export type DelegateFormData = z.infer<typeof delegateSchema>;
export type DelegateListFormData = z.infer<typeof delegateListSchema>;
