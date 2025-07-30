import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  getAuthorAvatar,
} from '@/lib/blog'

import { BadgeLink } from '@/components/ui/badge'
import { PostCard } from '@/components/post-card'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: post.authors.map((author) => ({ name: author.name, url: author.social.website })),
    openGraph: {
      title: post.seo?.openGraph?.title || post.title,
      description: post.seo?.openGraph?.description || post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastModified,
      authors: post.authors.map((author) => author.name),
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.twitter?.title || post.title,
      description: post.seo?.twitter?.description || post.description,
      creator: post.seo?.twitter?.creator || '@lifeiscontent',
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const [relatedPosts, { previousPost, nextPost }] = await Promise.all([
    getRelatedPosts(post.slug, post.tags, 3),
    getAdjacentPosts(post.slug),
  ])

  const publishedDate = new Date(post.date)
  const lastModifiedDate = post.lastModified ? new Date(post.lastModified) : null

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-4xl px-3 py-3 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-1 text-xs sm:space-x-2 sm:text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link href="/blog" className="text-gray-500 hover:text-gray-700">
                Blog
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="font-medium text-gray-900">{post.title}</span>
            </li>
          </ol>
        </div>
      </nav>

      <article className="mx-auto max-w-4xl px-3 py-8 sm:px-6 sm:py-16 lg:px-8">
        {/* Header */}
        <header className="mb-8 sm:mb-16">
          <div className="mt-6 sm:mt-10">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 sm:text-sm">
              <div className="flex items-center gap-1">
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5"
                  />
                </svg>
                <time dateTime={post.date}>
                  {publishedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>{post.readingTime.text}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Image
                  src={getAuthorAvatar(post.authors[0])}
                  alt={post.authors[0].name}
                  width={16}
                  height={16}
                  className="rounded-full object-cover"
                  style={{ objectPosition: 'center' }}
                />
                <span>{post.authors[0].name}</span>
              </div>
            </div>
          </div>

          {lastModifiedDate && (
            <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 sm:text-sm">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span>
                Last updated{' '}
                <time dateTime={post.lastModified}>
                  {lastModifiedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </span>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5 sm:mt-8 sm:gap-2">
              {post.tags.map((tag) => (
                <BadgeLink key={tag} href={`/blog/tag/${tag}`} size="xs">
                  {tag}
                </BadgeLink>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-sm prose-gray sm:prose-lg max-w-none">{post.content}</div>

        {/* Author Bio */}
        <div className="mt-8 border-t border-gray-200 pt-6 sm:mt-16 sm:pt-8">
          <div className="rounded-lg bg-gray-50 p-4 sm:p-6">
            <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">
              About the Author
            </h3>
            <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
              Aaron Reisman is a software engineer passionate about building great user experiences
              and sharing knowledge through writing and open source contributions.
            </p>
            <div className="mt-3 flex space-x-3 sm:mt-4 sm:space-x-4">
              <a
                href="https://github.com/lifeiscontent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
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
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {(previousPost || nextPost) && (
          <nav className="mt-8 border-t border-gray-200 pt-6 sm:mt-16 sm:pt-8">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
              {previousPost && (
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500 sm:text-sm">Previous Post</p>
                  <Link href={`/blog/${previousPost.slug}`} className="group block">
                    <h3 className="group-hover:text-primary-600 text-base font-semibold text-gray-900 transition-colors sm:text-lg">
                      {previousPost.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-600 sm:text-sm">
                      {previousPost.description}
                    </p>
                  </Link>
                </div>
              )}
              {nextPost && (
                <div className={previousPost ? 'text-right' : ''}>
                  <p className="mb-2 text-xs font-medium text-gray-500 sm:text-sm">Next Post</p>
                  <Link href={`/blog/${nextPost.slug}`} className="group block">
                    <h3 className="group-hover:text-primary-600 text-base font-semibold text-gray-900 transition-colors sm:text-lg">
                      {nextPost.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-600 sm:text-sm">
                      {nextPost.description}
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-8 border-t border-gray-200 pt-6 sm:mt-16 sm:pt-8">
            <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900 sm:mb-8 sm:text-2xl">
              Related Posts
            </h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
