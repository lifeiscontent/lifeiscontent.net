import path from 'path'
import fs from 'fs'
import { createHash } from 'crypto'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'
import { z } from 'zod'
import { isValidElement, type ReactElement } from 'react'
import { cache } from 'react'
import 'server-only'
import { mdxComponents } from '@/components/mdx'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

// Zod Schemas - Single source of truth for validation and types
const SocialLinksSchema = z.object({
  twitter: z.url('Twitter URL must be valid'),
  github: z.url('GitHub URL must be valid'),
  website: z.url('Website URL must be valid'),
})

const AuthorSchema = z.object({
  name: z.string().min(1, 'Author name is required'),
  email: z.email('Author email must be a valid email address'),
  bio: z.string().min(1, 'Author bio is required'),
  avatar: z.string().min(1, 'Avatar must be a valid path or URL').optional(),
  social: SocialLinksSchema,
})

const ReadingTimeSchema = z.object({
  text: z.string(),
  minutes: z.number(),
  time: z.number(),
  words: z.number(),
})

// Simplified schemas - removed image, url, siteName, etc. since we use Next.js file-based metadata APIs
// Images are generated dynamically via opengraph-image.tsx files
// URLs, site names, and other metadata are handled by Next.js layout metadata
const OpenGraphDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['article', 'website']).optional(),
})

const TwitterDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  creator: z.string().optional(),
})

// Simplified SEO schema - only fields we actually use for metadata overrides
const SEODataSchema = z.object({
  openGraph: OpenGraphDataSchema.optional(),
  twitter: TwitterDataSchema.optional(),
})

const BlogPostFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required and cannot be empty'),
  description: z.string().min(1, 'Description is required and cannot be empty').optional(),
  date: z
    .union([z.string(), z.number(), z.date()])
    .refine((date) => !isNaN(Date.parse(String(date))), 'Date must be a valid date string'),
  tags: z
    .array(
      z
        .string()
        .min(1, 'Tag cannot be empty')
        .regex(
          /^[a-z_][a-z0-9_]*$/,
          'Tag must be a valid lowercase hashtag format: start with letter or underscore, contain only lowercase letters, numbers, and underscores'
        )
    )
    .min(1, 'At least one tag is required'),
  lastModified: z
    .union([z.string(), z.number(), z.date()])
    .refine((date) => !isNaN(Date.parse(String(date))), 'Last modified must be a valid date string')
    .optional(),
  excerpt: z.string().optional(),
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
  authors: z.array(AuthorSchema).min(1, 'At least one author is required'),
  // Simplified metadata - removed redundant fields
  seo: SEODataSchema.optional(),
})

// BlogPost schema that includes the compiled content and computed fields
const BlogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.custom<React.ReactElement>(isValidElement, {
    message: 'Content must be a valid React element',
  }),
  excerpt: z.string(),
  date: z.string(),
  lastModified: z.string().optional(),
  tags: z.array(z.string()),
  authors: z.array(AuthorSchema),
  readingTime: ReadingTimeSchema,
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  seo: SEODataSchema.optional(),
})

const BlogPostMetaSchema = BlogPostSchema.omit({ content: true, seo: true })

const TagDataSchema = z.object({
  name: z.string(),
  count: z.number(),
  slug: z.string(),
})

// Export inferred types - Generated from schemas
export type Author = z.infer<typeof AuthorSchema>
export type SocialLinks = z.infer<typeof SocialLinksSchema>
export type ReadingTime = z.infer<typeof ReadingTimeSchema>
export type SEOData = z.infer<typeof SEODataSchema>
export type OpenGraphData = z.infer<typeof OpenGraphDataSchema>
export type TwitterData = z.infer<typeof TwitterDataSchema>
export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>
export type BlogPost = z.infer<typeof BlogPostSchema>
export type BlogPostMeta = z.infer<typeof BlogPostMetaSchema>
export type TagData = z.infer<typeof TagDataSchema>

// Export schemas for validation
export {
  AuthorSchema,
  BlogPostFrontmatterSchema,
  BlogPostSchema,
  BlogPostMetaSchema,
  TagDataSchema,
}

/**
 * Generate avatar URL for an author with Gravatar fallback
 */
export function getAuthorAvatar(author: Author): string {
  // Use provided avatar if available
  if (author.avatar) {
    return author.avatar
  }

  // Fall back to Gravatar based on email
  const emailHash = createEmailHash(author.email)
  return `https://www.gravatar.com/avatar/${emailHash}?d=identicon&s=64`
}

/**
 * Create MD5 hash of email for Gravatar
 */
function createEmailHash(email: string): string {
  const normalizedEmail = email.toLowerCase().trim()
  return createHash('md5').update(normalizedEmail).digest('hex')
}

// No default author - all posts must specify author information

/**
 * Get all blog post slugs
 * Cached to avoid repeated file system reads
 */
export const getAllPostSlugs = cache((): string[] => {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.(mdx|md)$/, ''))
})

/**
 * Get blog post data by slug
 * Cached to avoid repeated file I/O, parsing, and MDX compilation
 */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    // Try both .mdx and .md extensions
    let fullPath = path.join(postsDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`)
    }

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Validate frontmatter with Zod schema - this will throw if invalid
    const validatedData = BlogPostFrontmatterSchema.parse(data)

    // Compile the MDX content for RSC
    const { content: mdxContent } = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      },
    })

    // Calculate reading time
    const readingTimeStats = readingTime(content)
    const readingTimeData: ReadingTime = {
      text: readingTimeStats.text,
      minutes: readingTimeStats.minutes,
      time: readingTimeStats.time,
      words: readingTimeStats.words,
    }

    // Create excerpt from content if not provided in frontmatter
    const generatedExcerpt =
      content
        .replace(/#+\s+/g, '') // Remove markdown headers
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markdown
        .replace(/\*([^*]+)\*/g, '$1') // Remove italic markdown
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
        .slice(0, 160)
        .trim() + '...'

    return {
      slug,
      title: validatedData.title,
      description: validatedData.description || generatedExcerpt,
      content: mdxContent,
      excerpt: validatedData.excerpt || generatedExcerpt,
      date: new Date(String(validatedData.date)).toISOString(),
      lastModified: validatedData.lastModified
        ? new Date(String(validatedData.lastModified)).toISOString()
        : undefined,
      tags: validatedData.tags,
      authors: validatedData.authors, // Fixed: changed from author to authors
      readingTime: readingTimeData,
      featured: validatedData.featured,
      draft: validatedData.draft,
      seo: {
        openGraph: {
          title: validatedData.seo?.openGraph?.title || validatedData.title,
          description:
            validatedData.seo?.openGraph?.description ||
            validatedData.description ||
            generatedExcerpt,
          type: 'article',
        },
        twitter: {
          title: validatedData.seo?.twitter?.title || validatedData.title,
          description:
            validatedData.seo?.twitter?.description ||
            validatedData.description ||
            generatedExcerpt,
          creator: validatedData.seo?.twitter?.creator || '@lifeiscontent',
        },
      },
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error processing blog post ${slug}:`, error)
    // Re-throw Zod validation errors to surface schema issues during build
    throw error
  }
})

/**
 * Get all blog posts metadata
 * Cached to avoid repeatedly processing all posts
 */
export const getAllPosts = cache(async (): Promise<BlogPostMeta[]> => {
  const slugs = getAllPostSlugs()
  const posts: BlogPostMeta[] = []

  for (const slug of slugs) {
    const post = await getPostBySlug(slug)
    if (post && !post.draft) {
      posts.push({
        slug: post.slug,
        title: post.title,
        description: post.description,
        excerpt: post.excerpt,
        date: post.date,
        lastModified: post.lastModified,
        tags: post.tags,
        authors: post.authors,
        readingTime: post.readingTime,
        featured: post.featured,
        draft: post.draft,
      })
    }
  }

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

/**
 * Get featured blog posts
 */
export async function getFeaturedPosts(limit = 3): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.featured).slice(0, limit)
}

/**
 * Get recent blog posts
 */
export async function getRecentPosts(limit = 5): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.slice(0, limit)
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get all unique tags with post counts
 * Cached to avoid repeatedly processing all posts for tag aggregation
 */
export const getAllTags = cache(
  async (): Promise<Array<{ name: string; count: number; slug: string }>> => {
    const allPosts = await getAllPosts()
    const tagCounts = new Map<string, number>()

    allPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })

    return Array.from(tagCounts.entries())
      .map(([name, count]) => ({
        name,
        count,
        slug: name, // Tags are already lowercase by schema validation
      }))
      .sort((a, b) => b.count - a.count)
  }
)

/**
 * Get related posts based on tags
 */
export async function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  limit = 3
): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()

  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      ...post,
      score: post.tags.filter((tag) => currentTags.includes(tag)).length,
    }))
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return relatedPosts.map(({ score, ...post }) => post)
}

/**
 * Get previous and next posts
 */
export async function getAdjacentPosts(currentSlug: string): Promise<{
  previousPost: BlogPostMeta | null
  nextPost: BlogPostMeta | null
}> {
  const allPosts = await getAllPosts()
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug)

  return {
    previousPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    nextPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  }
}

/**
 * Search posts by title, description, or content
 */
export async function searchPosts(query: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  const searchTerm = query.toLowerCase().trim()

  if (!searchTerm) {
    return []
  }

  return allPosts.filter((post) => {
    const searchableText = [post.title, post.description, ...post.tags].join(' ').toLowerCase()

    return searchableText.includes(searchTerm)
  })
}

/**
 * Get posts archive by year and month
 */
export async function getPostsArchive(): Promise<
  Array<{
    year: number
    month: number
    posts: BlogPostMeta[]
  }>
> {
  const allPosts = await getAllPosts()
  const archive = new Map<string, BlogPostMeta[]>()

  allPosts.forEach((post) => {
    const date = new Date(post.date)
    const key = `${date.getFullYear()}-${date.getMonth()}`

    if (!archive.has(key)) {
      archive.set(key, [])
    }
    archive.get(key)!.push(post)
  })

  return Array.from(archive.entries())
    .map(([key, posts]) => {
      const [year, month] = key.split('-').map(Number)
      return { year, month, posts }
    })
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return b.month - a.month
    })
}

/**
 * Generate table of contents from markdown content
 */
export function generateTableOfContents(content: string): Array<{
  id: string
  title: string
  level: number
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: Array<{ id: string; title: string; level: number }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')

    toc.push({ id, title, level })
  }

  return toc
}

/**
 * Get all unique tags from posts
 */
