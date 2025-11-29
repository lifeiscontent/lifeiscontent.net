import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://lifeiscontent.net',
  image: {
    domains: ['www.gravatar.com'],
  },
  redirects: {
    '/blog': '/blog-postings',
    '/blog/tag': '/blog-postings/keywords',
    '/blog/tag/[id]': '/blog-postings/keywords/[id]',
    '/blog/[id]': '/blog-postings/[id]',
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'css-variables',
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
