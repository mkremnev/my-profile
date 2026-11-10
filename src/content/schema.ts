import { z } from 'astro/zod';

export const contactSchema = z.object({
  type: z.enum(['email', 'github', 'linkedin', 'telegram', 'website', 'other']),
  label: z.string().min(1),
  url: z.url(),
  icon: z.string().optional(),
});

export const hardSkillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z.enum(['basic', 'confident', 'advanced']),
  icon: z.string().regex(/^[a-z0-9-]+$/).optional(),
});

export const softSkillSchema = z.object({
  name: z.string().min(1),
  note: z.string().optional(),
});

export const profileSchema = z.object({
  locale: z.enum(['ru', 'en']),
  name: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1).max(400),
  photo: z.string().optional(),
  contacts: z.array(contactSchema).min(2),
  hardSkills: z.array(hardSkillSchema).min(1),
  softSkills: z.array(softSkillSchema).min(1),
});

export type Contact = z.infer<typeof contactSchema>;
export type HardSkill = z.infer<typeof hardSkillSchema>;
export type SoftSkill = z.infer<typeof softSkillSchema>;
export type Profile = z.infer<typeof profileSchema>;
