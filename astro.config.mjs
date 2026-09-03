import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://craigchandler.xyz',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    format: 'directory'
  }
});
