import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { profileSchema } from './content/schema';

const profile = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/profile' }),
  schema: profileSchema,
});

export const collections = { profile };
