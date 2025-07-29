import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { Badge, BadgeLink } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts, insights, and tutorials on web development, software engineering, and technology.',
  openGraph: {
    title: 'Blog | lifeiscontent.net',
    description:
      'Thoughts, insights, and tutorials on web development, software engineering, and technology.',
    url: 'https://lifeiscontent.net/blog',
  },
  twitter: {
    title: 'Blog | lifeiscontent.net',
    description:
      'Thoughts, insights, and tutorials on web development, software engineering, and technology.',
  },
}

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()])

  const featuredPosts = posts.filter((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="from-primary-700 to-primary-900 bg-gradient-to-br">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Blog</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Thoughts, insights, and tutorials on web development, software engineering, and
              technology.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
                  Featured Posts
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {featuredPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-x-4 text-xs">
                          <time dateTime={post.date} className="text-gray-500">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                          <span className="text-gray-500">{post.readingTime.text}</span>
                          <Badge variant="white-bg" text="xs" aria-selected={true}>
                            Featured
                          </Badge>
                        </div>
                        <div className="group relative">
                          <h3 className="text-xl leading-6 font-semibold text-gray-900 group-hover:text-gray-600">
                            <Link href={`/blog/${post.slug}`}>
                              <span className="absolute inset-0" />
                              {post.title}
                            </Link>
                          </h3>
                          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                            {post.description}
                          </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <BadgeLink
                              key={tag}
                              href={`/blog/tag/${tag}`}
                              variant="white-bg"
                              text="xs"
                            >
                              {tag}
                            </BadgeLink>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
                {featuredPosts.length > 0 ? 'All Posts' : 'Recent Posts'}
              </h2>
              <div className="space-y-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.date} className="text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="text-gray-500">{post.readingTime.text}</span>
                    </div>
                    <div className="group relative">
                      <h3 className="text-xl leading-6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-4 text-base leading-6 text-gray-600">{post.description}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <BadgeLink key={tag} href={`/blog/tag/${tag}`} variant="white-bg" text="xs">
                          {tag}
                        </BadgeLink>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {posts.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-lg text-gray-500">No blog posts found.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="mt-16 lg:mt-0">
            <div className="sticky top-8 space-y-8">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 20).map((tag) => (
                      <BadgeLink
                        key={tag.slug}
                        href={`/blog/tag/${tag.slug}`}
                        variant="gray-bg"
                        text="sm"
                      >
                        {tag.name}
                        <span className="ml-1 text-xs text-gray-400">({tag.count})</span>
                      </BadgeLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
