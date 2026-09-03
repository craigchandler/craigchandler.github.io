import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://craigchandler.xyz',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});
