import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, getEntry } from 'astro:content'
import { html } from 'satori-html'
import { satoriAstroOG } from 'satori-astro'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const palette = {
  canvas: '#ffffff',
  text: '#0a0a0a',
  eyebrow: '#737373',
  description: '#404040',
  accent: 'oklch(60% 0.13 45)',
} as const

const siteEntry = await getEntry('sites', 'site')
const blogSchemaEntry = await getEntry('blogs', 'blog')
const blogEntries = await getCollection('blog-postings')
const definedTermEntries = await getCollection('defined-terms')

if (!siteEntry) {
  throw new Error('Missing site metadata entry at src/content/sites/site.json')
}

if (!blogSchemaEntry) {
  throw new Error('Missing blog metadata entry at src/content/blogs/blog.json')
}

const navText = siteEntry.data.alternateName ?? siteEntry.data.name ?? 'lifeiscontent'

const fontSources = [
  {
    name: 'Geist',
    weight: 400 as const,
    path: '../../../node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff',
  },
  {
    name: 'Geist',
    weight: 500 as const,
    path: '../../../node_modules/@fontsource/geist-sans/files/geist-sans-latin-500-normal.woff',
  },
  {
    name: 'Geist',
    weight: 600 as const,
    path: '../../../node_modules/@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff',
  },
  {
    name: 'Geist',
    weight: 700 as const,
    path: '../../../node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff',
  },
  {
    name: 'Geist Mono',
    weight: 400 as const,
    path: '../../../node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff',
  },
  {
    name: 'Geist Mono',
    weight: 500 as const,
    path: '../../../node_modules/@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff',
  },
] as const

const fontBuffers = await Promise.all(
  fontSources.map(({ path }) => readFile(new URL(path, import.meta.url)))
)
const iconSvgBuffer = await readStaticAsset('../../assets/images/icon.svg')
const logoSvgMarkup = iconSvgBuffer.toString('utf-8')

const satoriFonts = fontSources.map((source, index) => ({
  name: source.name,
  data: bufferToArrayBuffer(fontBuffers[index]!),
  weight: source.weight,
  style: 'normal' as const,
}))

type OgPage = {
  title?: string
  description: string
  eyebrow: string
}

const keywordUsageCounts = new Map<string, number>()
for (const entry of blogEntries) {
  for (const keywordRef of entry.data.keywords) {
    const keywordId = keywordRef.id.split('/').pop() ?? keywordRef.id
    keywordUsageCounts.set(keywordId, (keywordUsageCounts.get(keywordId) ?? 0) + 1)
  }
}

const pages: Record<string, OgPage> = {
  site: {
    title: 'I build the parts of products other people have to live with after launch.',
    eyebrow: 'Site',
    description:
      'Software engineer working on React, TypeScript, Phoenix, and Elixir. Components, error states, microcopy, the small things that decide how an app actually feels.',
  },
  'blog-postings': {
    title: 'Blog Postings',
    eyebrow: 'Index',
    description: 'Posts on React, Phoenix, components, and the bits in between.',
  },
}

for (const entry of blogEntries) {
  pages[`blog-postings/${entry.id}`] = {
    eyebrow: 'Blog Posting',
    title: entry.data.headline,
    description: entry.data.description,
  }
}

for (const term of definedTermEntries) {
  const keywordName = term.data.name ?? humanizeSlug(term.id)
  const usageCount = keywordUsageCounts.get(term.id) ?? 0
  const keywordLabel = usageCount === 1 ? 'post' : 'posts'
  const description =
    usageCount > 0
      ? `${usageCount} ${keywordLabel} on this topic.`
      : (term.data.description ?? `Posts tagged "${keywordName}".`)

  pages[`blog-postings/keywords/${term.id}`] = {
    eyebrow: 'Tagged',
    title: keywordName,
    description,
  }
}

const toSlug = (path: string) => {
  let slug = path.replace(/^\/src\/pages\//, '')
  slug = slug.replace(/\.[^.]*$/, '') + '.png'
  slug = slug.replace(/\/index\.png$/, '.png')
  return slug
}

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(pages).map((key) => ({
    params: { route: toSlug(key) },
  }))

export const GET: APIRoute = async ({ params }) => {
  const slugValue = Array.isArray(params?.route) ? params?.route.join('/') : params?.route

  if (!slugValue) {
    return new Response('Not found', { status: 404 })
  }

  const match = Object.entries(pages).find(([key]) => {
    const slug = toSlug(key)
    return slug === slugValue || slug.replace(/^\//, '') === slugValue
  })

  if (!match) {
    return new Response('Not found', { status: 404 })
  }

  const [, ogPage] = match
  return renderOgResponse(ogPage)
}

async function renderOgResponse(page: OgPage) {
  return satoriAstroOG({
    template: buildSiteTemplate(page),
    width: OG_WIDTH,
    height: OG_HEIGHT,
  }).toResponse({
    satori: {
      fonts: satoriFonts,
    },
  })
}

function buildSiteTemplate(page: OgPage) {
  const headingSpan = page.title
    ? `<span style="font-size:56px;line-height:1.1;font-weight:600;letter-spacing:-0.012em;color:${palette.text};">${page.title}</span>`
    : ''
  const brandLabel = `<span style="font-family:'Geist Mono';font-size:18px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;color:${palette.text};">${navText}</span>`
  const eyebrowLabel = `<span style="font-family:'Geist Mono';font-size:14px;letter-spacing:0.22em;text-transform:uppercase;color:${palette.eyebrow};">${page.eyebrow}</span>`

  const accentStripe = `
    <div style="position:absolute;top:0;left:0;right:0;height:4px;display:flex;background:linear-gradient(to right, transparent 0%, ${palette.accent} 18%, ${palette.accent} 22%, transparent 100%);"></div>
  `

  const siteMarkup = `
    <div style="display:flex;width:100%;height:100%;padding:64px;background:${palette.canvas};font-family:'Geist';color:${palette.text};gap:64px;position:relative;">
      ${accentStripe}
      <div style="width:200px;height:auto;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        ${logoSvgMarkup}
      </div>
      <div style="display:flex;flex-direction:column;gap:24px;padding:24px 0;width:872px;">
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${brandLabel}
          ${eyebrowLabel}
        </div>
        <div style="display:flex;flex-direction:column;gap:20px;flex-grow:1;justify-content:flex-end;">
          ${headingSpan}
          <p style="font-size:24px;line-height:1.5;margin:0;max-width:840px;color:${palette.description};">${page.description}</p>
        </div>
      </div>
    </div>
  `

  return html(siteMarkup)
}

function humanizeSlug(value: string) {
  return value.split('/').pop()?.replace(/-/g, ' ') ?? value
}

function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
  const arrayBuffer = new ArrayBuffer(buffer.byteLength)
  new Uint8Array(arrayBuffer).set(buffer)
  return arrayBuffer
}

async function readStaticAsset(relativePath: string): Promise<Buffer> {
  const assetUrl = new URL(relativePath, import.meta.url)
  try {
    return await readFile(assetUrl)
  } catch (error) {
    const filePath = fileURLToPath(assetUrl)
    const distSegment = `${path.sep}dist${path.sep}`
    if (!filePath.includes(distSegment)) {
      throw error
    }
    const fallbackPath = filePath.replace(distSegment, `${path.sep}src${path.sep}`)
    return readFile(fallbackPath)
  }
}
