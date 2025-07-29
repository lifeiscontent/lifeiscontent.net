import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTags, getPostsByTag, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Badge, BadgeLink } from '@/components/ui/badge'

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    slug: tag.slug,
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tags = await getAllTags()
  const tag = tags.find((t) => t.slug === slug)

  if (!tag) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `${tag.name} Posts`,
    description: `All blog posts tagged with "${tag.name}". ${tag.count} ${tag.count === 1 ? 'post' : 'posts'} available.`,
    openGraph: {
      title: `${tag.name} Posts | lifeiscontent.net`,
      description: `All blog posts tagged with "${tag.name}". ${tag.count} ${tag.count === 1 ? 'post' : 'posts'} available.`,
      url: `https://lifeiscontent.net/blog/tag/${slug}`,
    },
    twitter: {
      title: `${tag.name} Posts | lifeiscontent.net`,
      description: `All blog posts tagged with "${tag.name}". ${tag.count} ${tag.count === 1 ? 'post' : 'posts'} available.`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const [tags, allPosts] = await Promise.all([getAllTags(), getAllPosts()])

  const currentTag = tags.find((t) => t.slug === slug)

  if (!currentTag) {
    notFound()
  }

  const posts = await getPostsByTag(currentTag.name)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="from-primary-700 to-primary-900 bg-gradient-to-br">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <Link
                href="/blog"
                className="text-primary-200 text-sm font-medium transition-colors hover:text-white"
              >
                ← Back to Blog
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {currentTag.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with &ldquo;
              {currentTag.name}&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Posts */}
            <section>
              <div className="space-y-8">
                {posts.map((post) => (
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
                      {post.featured && (
                        <Badge variant="white-bg" text="xs" aria-selected={true}>
                          Featured
                        </Badge>
                      )}
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
                        <BadgeLink
                          key={tag}
                          href={`/blog/tag/${tag}`}
                          variant="white-bg"
                          text="xs"
                          selected={tag === currentTag.name}
                        >
                          {tag}
                        </BadgeLink>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {posts.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-lg text-gray-500">No posts found with this tag.</p>
                  <Link
                    href="/blog"
                    className="text-primary-500 hover:text-primary-600 mt-4 font-medium transition-colors"
                  >
                    Browse all posts
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="mt-16 lg:mt-0">
            <div className="sticky top-8 space-y-8">
              {/* Related Tags */}
              {tags.length > 1 && (
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Other Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags
                      .filter((tag) => tag.slug !== slug)
                      .slice(0, 15)
                      .map((tag) => (
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
                  <div className="mt-4">
                    <Link
                      href="/blog"
                      className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
                    >
                      View all posts →
                    </Link>
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
