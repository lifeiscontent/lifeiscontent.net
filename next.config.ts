import type { NextConfig } from 'next'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import withSerwist from '@serwist/next'

// @ts-ignore
const createMDX = require('@next/mdx')

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  // Handle trailing slashes for GitHub Pages
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    // optimizeCss: true, // Disabled due to build issues
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
})

export default withSerwist({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
  // Register the service worker
  register: true,
  // Skip waiting for existing service workers
  reloadOnOnline: true,
})(withMDX(nextConfig))
