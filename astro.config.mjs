// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  // Section CSS is one shared sheet; inline it when small, otherwise one cached file.
  build: { inlineStylesheets: 'auto' },
  env: {
    schema: {
      // The MockDrip portal (sign-up, log-in, dashboards), a separate app.
      // Set it for every deploy; the default suits running both apps locally.
      PUBLIC_APP_URL: envField.string({
        context: 'client',
        access: 'public',
        url: true,
        default: 'http://localhost:3000',
      }),
    },
  },
});
