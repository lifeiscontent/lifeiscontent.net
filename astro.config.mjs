import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://lifeiscontent.net',
  image: {
    domains: ['www.gravatar.com'],
  },
  redirects: {
    '/elegant-error-handling-in-phoenix-liveview-with-ash':
      '/blog-postings/elegant-error-handling-in-phoenix-liveview-with-ash',
    '/the-component-manifesto': '/blog-postings/the-component-manifesto',
    '/understanding-protocols-in-elixir-a-comprehensive-guide':
      '/blog-postings/understanding-protocols-in-elixir-a-comprehensive-guide',
    '/blog': '/blog-postings',
    '/blog/[id]': '/blog-postings/[id]',
    '/blog/tag': '/blog-postings/keywords',
    '/blog/tag/[id]': '/blog-postings/keywords/[id]',
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
})
