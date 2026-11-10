import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://mkremnev.github.io',
  base: '/my-profile',
  integrations: [react()],
});
