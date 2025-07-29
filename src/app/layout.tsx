import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'lifeiscontent.net',
    template: '%s | lifeiscontent.net',
  },
  description: 'Online Presence of Aaron Reisman',
  keywords: [
    'Aaron Reisman',
    'software engineer',
    'web development',
    'React',
    'TypeScript',
    'Blog',
    'Programming',
  ],
  authors: [{ name: 'Aaron Reisman', url: 'https://lifeiscontent.net' }],
  creator: 'Aaron Reisman',
  publisher: 'Aaron Reisman',
  metadataBase: new URL('https://lifeiscontent.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'lifeiscontent.net',
    description: 'Online Presence of Aaron Reisman',
    url: 'https://lifeiscontent.net',
    siteName: 'lifeiscontent.net',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'lifeiscontent.net',
    description: 'Online Presence of Aaron Reisman',
    creator: '@lifeiscontent',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className={`${inter.className} h-full bg-white text-gray-900 antialiased`}>
        <div className="flex min-h-full flex-col">
          <header className="no-print">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="text-primary-500 hover:text-primary-600 text-xl font-bold"
                  >
                    lifeiscontent
                  </Link>
                </div>
                <div className="flex items-center space-x-8">
                  <Link
                    href="/blog"
                    className="hover:text-primary-500 text-gray-700 transition-colors"
                  >
                    Blog
                  </Link>
                  <a
                    href="mailto:aaron@lifeiscontent.net"
                    className="hover:text-primary-500 text-gray-700 transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="no-print border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                    Connect
                  </h3>
                  <div className="mt-4 flex space-x-4">
                    <a
                      href="https://github.com/lifeiscontent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/lifeiscontent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <span className="sr-only">X</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="mailto:aaron@lifeiscontent.net"
                      className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <span className="sr-only">Email</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 14H4V6l8 5 8-5v11z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                    Legal
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-base text-gray-600">
                      © {new Date().getFullYear()} Aaron Reisman. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
