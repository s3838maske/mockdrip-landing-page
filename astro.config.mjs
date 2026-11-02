// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  // Section CSS is one shared sheet; inline it when small, otherwise one cached file.
  build: { inlineStylesheets: 'auto' },
});
