import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection, getEntry } from 'astro:content'
import { createPublishedFilter, sortBlogPostingsByDate } from '@lib/content'

export async function GET(context: APIContext) {
  const now = Date.now()
  const siteEntry = await getEntry('sites', 'site')
  const siteName = siteEntry?.data.name ?? 'lifeiscontent'
  const siteDescription =
    siteEntry?.data.description ??
    'Purposeful stories for thoughtful builders. A mix of engineering, design, and systems thinking.'

  const blogPostings = sortBlogPostingsByDate(
    await getCollection('blog-postings', createPublishedFilter(now))
  )

  return rss({
    title: siteName,
    description: siteDescription,
    site: context.site ?? 'https://lifeiscontent.net',
    items: blogPostings.map((posting) => ({
      title: posting.data.headline,
      description: posting.data.description ?? posting.data.abstract,
      link: `/blog-postings/${posting.id}`,
      pubDate: posting.data.datePublished,
      updated: posting.data.dateModified ?? posting.data.datePublished,
      categories: posting.data.keywords?.map((keyword) => keyword.id) ?? [],
    })),
    customData: '<language>en-us</language>',
  })
}
