# lifeiscontent.net

A modern, offline-first blog built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS v4
- **Offline-First**: Progressive Web App (PWA) with service worker caching
- **Markdown Blog**: Blog posts written in Markdown with frontmatter
- **SEO Optimized**: Built-in SEO with sitemap, robots.txt, and Open Graph support
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance**: Optimized images, lazy loading, and static generation
- **Type Safe**: Full TypeScript support with strict type checking
- **Modern Tooling**: ESLint, Prettier, and automated formatting

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: Markdown with [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Markdown Processing**: [remark](https://remark.js.org/) with syntax highlighting
- **PWA**: [next-pwa](https://github.com/shadowwalker/next-pwa)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lifeiscontent/lifeiscontent.net.git
   cd lifeiscontent.net
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Start the development server**:

   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🧰 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm clean` - Clean build artifacts

## 📝 Writing Blog Posts

Blog posts are stored in `src/content/blog/` as Markdown files with frontmatter:

```markdown
---
title: 'Your Post Title'
description: 'A brief description of your post'
date: '2024-01-15'
tags: ['javascript', 'react', 'nextjs']
featured: true
draft: false
---

Your blog content goes here...
```

### Frontmatter Options

- `title` (required): The post title
- `description` (required): A brief description for SEO
- `date` (required): Publication date in YYYY-MM-DD format
- `tags` (optional): Array of tags
- `featured` (optional): Whether the post is featured on the homepage
- `draft` (optional): Whether the post is a draft (won't be published)
- `lastModified` (optional): Last modification date

## 🎨 Styling

This project uses Tailwind CSS v4 with a CSS-first configuration approach. Custom styles and theme configuration are defined in `src/app/globals.css`.

### Custom Colors

The primary color palette is based on purple shades:

- Primary: `#7c3aed` (purple-600)
- Primary hover: `#6d28d9` (purple-700)

### Dark Mode

The site automatically respects the user's system theme preference and includes proper dark mode styles.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Google Analytics tracking ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Site URL for sitemap generation
NEXT_PUBLIC_SITE_URL=https://lifeiscontent.net
```

### PWA Configuration

PWA settings are configured in `next.config.ts`. The app includes:

- Service worker for offline functionality
- Web app manifest for install prompts
- Caching strategies for different resource types

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog-related pages
│   ├── globals.css        # Global styles and Tailwind config
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   └── sitemap.ts         # Dynamic sitemap generation
├── content/
│   └── blog/              # Markdown blog posts
├── lib/
│   ├── blog.ts            # Blog utility functions
│   └── utils.ts           # General utility functions
└── types/
    └── blog.ts            # TypeScript type definitions
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Deploy automatically on every push to main

### Other Platforms

The app can be deployed to any platform that supports Node.js:

1. Run `pnpm build` to create a production build
2. Upload the `.next` folder and other necessary files
3. Run `pnpm start` to start the production server

## 📊 Performance

This site is optimized for performance with:

- Static site generation (SSG) for blog posts
- Image optimization with Next.js Image component
- Automatic code splitting
- Service worker caching
- Minimal JavaScript bundle

## 🔍 SEO Features

- Automatic sitemap generation
- Open Graph meta tags
- Twitter Card support
- Structured data for blog posts
- Robots.txt configuration
- Canonical URLs

## 🧪 Testing

Add your testing setup here when implemented. Recommended tools:

- [Jest](https://jestjs.io/) for unit testing
- [Playwright](https://playwright.dev/) for E2E testing
- [Testing Library](https://testing-library.com/) for component testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Aaron Reisman** - [@lifeiscontent](https://github.com/lifeiscontent)

- Website: [lifeiscontent.net](https://lifeiscontent.net)
- Twitter: [@lifeiscontent](https://twitter.com/lifeiscontent)
- Email: aaron@lifeiscontent.net

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for hosting and deployment platform
