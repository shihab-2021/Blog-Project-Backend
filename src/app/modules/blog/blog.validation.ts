import { z } from 'zod';

const blogValidationSchema = z.object({
  title: z.string({ required_error: 'Title is required!' }),
  content: z.string({ required_error: 'Content is required' }),
});

const updateBlogValidationSchema = z.object({
  title: z.string({ required_error: 'Title is required!' }).optional(),
  content: z.string({ required_error: 'Content is required' }).optional(),
});

export const blogValidations = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
