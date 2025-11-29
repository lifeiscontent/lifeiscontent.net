import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Reusable schema fragments for schema.org structured data
const personSchema = z.object({
  '@type': z.literal('Person').default('Person'),
  name: z.string(),
  email: z.string().email(),
  description: z.string(),
  url: z.string().url().optional(),
  image: z.string().url().optional(),
  sameAs: z.array(z.string().url()).default([]),
})

const definedTermSchema = z.object({
  '@type': z.literal('DefinedTerm').default('DefinedTerm'),
  name: z.string(),
  description: z.string().optional(),
})

const imageObjectSchema = z.object({
  '@type': z.literal('ImageObject').default('ImageObject'),
  url: z.string().url(),
  caption: z.string().optional(),
})

const blogReferenceSchema = z.object({
  '@type': z.literal('Blog').default('Blog'),
  '@id': z.string().url(),
  name: z.string(),
})

const webPageReferenceSchema = z.object({
  '@type': z.literal('WebPage').default('WebPage'),
  '@id': z.string().url(),
})

const entryPointSchema = z.object({
  '@type': z.literal('EntryPoint').default('EntryPoint'),
  urlTemplate: z.string(),
})

const searchActionSchema = z.object({
  '@type': z.literal('SearchAction').default('SearchAction'),
  target: entryPointSchema,
  'query-input': z.string(),
})

const blogEntitySchema = blogReferenceSchema.extend({
  '@context': z.literal('https://schema.org'),
  url: z.string().url(),
  description: z.string(),
})

const websiteSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@type': z.literal('WebSite').default('WebSite'),
  '@id': z.string().url(),
  url: z.string().url(),
  name: z.string(),
  alternateName: z.string().optional(),
  description: z.string(),
  inLanguage: z.string().default('en-US'),
  publisher: reference('persons'),
  sameAs: z.array(z.string().url()).default([]),
  potentialAction: searchActionSchema.optional(),
})

const blogPostingSchema = z.object({
  '@context': z.literal('https://schema.org').default('https://schema.org'),
  '@type': z.literal('BlogPosting').default('BlogPosting'),
  '@id': z.string().url(),
  url: z.string().url(),
  headline: z.string(),
  description: z.string(),
  abstract: z.string().optional(),
  datePublished: z.coerce.date(),
  dateModified: z.coerce.date().optional(),
  keywords: z.array(reference('defined-terms')).default([]),
  author: z.array(reference('persons')),
  image: imageObjectSchema.optional(),
  inLanguage: z.string().default('en-US'),
  isPartOf: blogReferenceSchema,
  mainEntityOfPage: webPageReferenceSchema,
})

// Collections using the reusable schemas
const blogPostings = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/blog-postings',
  }),
  schema: blogPostingSchema,
})

const persons = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/persons',
  }),
  schema: personSchema,
})

const definedTerms = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/content/defined-terms',
  }),
  schema: definedTermSchema,
})

const blogs = defineCollection({
  loader: glob({
    pattern: '*.json',
    base: './src/content/blogs',
  }),
  schema: blogEntitySchema,
})

const sites = defineCollection({
  loader: glob({
    pattern: '*.json',
    base: './src/content/sites',
  }),
  schema: websiteSchema,
})

export const collections = {
  blogs,
  'blog-postings': blogPostings,
  sites,
  persons,
  'defined-terms': definedTerms,
}
