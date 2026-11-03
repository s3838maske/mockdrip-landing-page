// Links into the MockDrip portal. Paths carry no language: the portal sends
// each visitor to English or Hindi from their saved choice or browser.

import { PUBLIC_APP_URL } from 'astro:env/client';

const app = PUBLIC_APP_URL.replace(/\/+$/, '');

export const appLinks = {
  signup: `${app}/signup`,
  login: `${app}/login`,
};
