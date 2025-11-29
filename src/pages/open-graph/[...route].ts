import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, getEntry } from 'astro:content'
import { html } from 'satori-html'
import { satoriAstroOG } from 'satori-astro'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const neutralPalette = {
  canvas: '#f5f5f5',
  panel: '#fcfcfc',
  border: '#e4e4e7',
  divider: '#d4d4d8',
  text: '#0a0a0a',
  eyebrow: '#525252',
  description: '#262626',
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
    weight: 400,
    path: '../../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff',
  },
  {
    weight: 600,
    path: '../../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff',
  },
  {
    weight: 700,
    path: '../../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff',
  },
] as const

const fontBuffers = await Promise.all(
  fontSources.map(({ path }) => readFile(new URL(path, import.meta.url)))
)
const iconSvgBuffer = await readStaticAsset('../../assets/images/icon.svg')
const logoSvgMarkup = iconSvgBuffer.toString('utf-8')

const satoriFonts = fontSources.map((source, index) => ({
  name: 'Inter',
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
    title: 'Narrative systems',
    eyebrow: 'Site',
    description:
      'I help teams design experiences that feel inevitable, where engineering, content, and brand move together without seams.',
  },
  'blog-postings': {
    title: 'Essays & dispatches',
    eyebrow: 'Blog Postings',
    description:
      'Systems thinking riffs, architecture deep dives, and lessons from building for people at scale.',
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
  const keywordLabel = usageCount === 1 ? 'blog posting' : 'blog postings'
  const description =
    usageCount > 0
      ? `${usageCount} ${keywordLabel} referencing "${keywordName}".`
      : (term.data.description ?? `Writing tagged with "${keywordName}" from lifeiscontent.`)

  pages[`blog-postings/keywords/${term.id}`] = {
    eyebrow: 'Keyword',
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
  const palette = neutralPalette
  const headingSpan = page.title
    ? `<span style="font-size:48px;line-height:1;font-weight:600;color:${palette.text};">${page.title}</span>`
    : ''
  const brandLabel = `<span style="font-size:36px;letter-spacing:0.4em;text-transform:uppercase;font-weight:600;color:${palette.text};">${navText}</span>`

  const siteMarkup = `
    <div style="display:flex;width:100%;height:100%;padding:48px;background:${palette.canvas};font-family:'Inter';color:${palette.text};gap:48px;">
      <div style="width:264px;height:auto;display:flex;align-items:center;justify-content:center;">
        ${logoSvgMarkup}
      </div>
      <div style="display:flex;flex-direction:column;gap:24px;padding:68px 0;width:792px;">
        <div style="display:flex;flex-direction:column;gap:12px;">
            ${brandLabel}
            <span style="font-size:20px;letter-spacing:0.35em;text-transform:uppercase;color:${palette.eyebrow};">${page.eyebrow}</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;flex-grow:1;justify-content:flex-end;">
                ${headingSpan}
                <p style="font-size:28px;line-height:1.5;margin:0;max-width:820px;color:${palette.description};">${page.description}</p>
        </div>
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
