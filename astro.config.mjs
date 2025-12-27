// @ts-check
import { defineConfig } from 'astro/config';

// Cloudflare Pages adapter for SSG (Static Site Generation)
// Using static output since the site doesn't need SSR
export default defineConfig({
  site: 'https://brysontang.dev',

  // Static output for Cloudflare Pages
  // No adapter needed for pure static sites
  output: 'static',

  build: {
    // Inline stylesheets for faster loading
    inlineStylesheets: 'auto',
  },

  // Ensure trailing slashes are handled consistently
  trailingSlash: 'ignore',

  // Vite configuration
  vite: {
    build: {
      // Ensure CSS is not tree-shaken
      cssMinify: true,
    },
  },
});
