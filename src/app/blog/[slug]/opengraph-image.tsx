import { ImageResponse } from 'next/og'
import { getPostBySlug, getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

// Pre-generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Image metadata
export const alt = 'Blog Post - lifeiscontent.net'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    // Fallback if post not found
    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#290070',
          }}
        >
          <h1 style={{ fontSize: 72, fontWeight: 'bold' }}>Post Not Found</h1>
        </div>
      ),
      {
        ...size,
      }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#290070', // primary-500 equivalent
          padding: 60,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '100%',
          }}
        >
          <h1
            style={{
              fontSize: post.title.length > 50 ? 56 : post.title.length > 30 ? 72 : 84,
              fontWeight: 'bold',
              margin: 0,
              marginBottom: 40,
              lineHeight: 1.1,
              textAlign: 'center',
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              opacity: 0.7,
            }}
          >
            <p
              style={{
                fontSize: 24,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              lifeiscontent.net
            </p>
            <span style={{ fontSize: 24 }}>•</span>
            <p
              style={{
                fontSize: 24,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {post.authors[0]?.name || 'Aaron Reisman'}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
