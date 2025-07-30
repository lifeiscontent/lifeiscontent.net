import type { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { BadgeLink } from '@/components/ui/badge'
import { PostCard } from '@/components/post-card'

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
                    <PostCard key={post.slug} post={post} variant="featured" />
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
                  <PostCard key={post.slug} post={post} />
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
                        variant="subtle"
                        size="sm"
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
