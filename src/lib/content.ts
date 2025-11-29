import type { CollectionEntry } from 'astro:content'

type PersonData = CollectionEntry<'persons'>['data']
type BlogPostingData = BlogPostingEntry['data']
type BlogPostStructuredFields = Omit<BlogPostingData, 'author' | 'keywords'>
type BlogJsonLdPost = BlogPostStructuredFields & {
  keywords: DefinedTermEntry['data'][]
  author: PersonData[]
}
export type BlogPostingRelations = {
  entry: BlogPostingEntry
  authors: PersonEntry[]
  keywords: DefinedTermEntry[]
}

export type BlogPostingEntry = CollectionEntry<'blog-postings'>
export type DefinedTermEntry = CollectionEntry<'defined-terms'>
export type DefinedTermsById = Map<string, DefinedTermEntry>
export type KeywordReference = BlogPostingEntry['data']['keywords'][number]
export type KeywordUsage = {
  keyword: DefinedTermEntry
  usageCount: number
}
export type BlogEntry = CollectionEntry<'blogs'>
export type PersonEntry = CollectionEntry<'persons'>

export function createPublishedFilter(referenceTime = Date.now()) {
  return (entry: BlogPostingEntry) => entry.data.datePublished.getTime() <= referenceTime
}

export function sortBlogPostingsByDate(entries: BlogPostingEntry[]) {
  return [...entries].sort(
    (a, b) => b.data.datePublished.getTime() - a.data.datePublished.getTime()
  )
}

export function createDefinedTermsByIdMap(definedTerms: DefinedTermEntry[]) {
  return new Map(definedTerms.map((definedTerm) => [definedTerm.id, definedTerm] as const))
}

export function aggregateKeywordUsages(keywordGroups: DefinedTermEntry[][]) {
  const usage = new Map<string, KeywordUsage>()
  for (const keywordEntries of keywordGroups) {
    for (const keywordEntry of keywordEntries) {
      const current = usage.get(keywordEntry.id)
      usage.set(keywordEntry.id, {
        keyword: keywordEntry,
        usageCount: (current?.usageCount ?? 0) + 1,
      })
    }
  }

  return Array.from(usage.values()).sort((a, b) => b.usageCount - a.usageCount)
}

type KeywordCount = { keyword: DefinedTermEntry; count: number }

export type BlogJsonLdResult = {
  keywords: DefinedTermEntry[]
  blogJsonLd: BlogEntry['data'] & { blogPost: BlogJsonLdPost[] }
}

export function buildBlogPostingJsonLd(
  entry: BlogPostingEntry,
  authors: PersonEntry[],
  keywords: DefinedTermEntry[]
) {
  return {
    ...entry.data,
    articleBody: entry.body ?? '',
    keywords: keywords.map((keyword) => keyword.data),
    author: authors.map((authorEntry) => authorEntry.data),
  }
}

export function buildBlogJsonLd(blogEntry: BlogEntry, blogPostings: BlogPostingRelations[]) {
  const keywordUsage = new Map<string, KeywordCount>()
  const blogPost = blogPostings.map(({ entry, authors, keywords }) => {
    const { author: _authorRefs, keywords: _keywordRefs, ...structuredFields } = entry.data

    for (const keywordEntry of keywords) {
      const current = keywordUsage.get(keywordEntry.id)
      keywordUsage.set(keywordEntry.id, {
        keyword: keywordEntry,
        count: (current?.count ?? 0) + 1,
      })
    }

    return {
      ...structuredFields,
      keywords: keywords.map((keyword) => keyword.data),
      author: authors.map((authorEntry) => authorEntry.data),
    }
  })

  const keywords = Array.from(keywordUsage.values())
    .sort((a, b) => b.count - a.count)
    .map(({ keyword }) => keyword)

  return {
    keywords,
    blogJsonLd: {
      ...blogEntry.data,
      blogPost,
    },
  }
}

export function computeRelatedEntries(entry: BlogPostingEntry, entries: BlogPostingEntry[]) {
  const entryKeywordIds = new Set(entry.data.keywords.map((kw) => kw.id))
  return entries
    .filter((candidate) => candidate.id !== entry.id)
    .map((candidate) => ({
      entry: candidate,
      score: candidate.data.keywords.reduce((score, keywordRef) => {
        return entryKeywordIds.has(keywordRef.id) ? score + 1 : score
      }, 0),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((candidate) => candidate.entry)
}

export function findAdjacentEntries(entry: BlogPostingEntry, sortedEntries: BlogPostingEntry[]) {
  const currentIndex = sortedEntries.findIndex((item) => item.id === entry.id)
  return {
    previous: currentIndex < sortedEntries.length - 1 ? sortedEntries[currentIndex + 1] : null,
    next: currentIndex > 0 ? sortedEntries[currentIndex - 1] : null,
  }
}

export function buildSocialLinks(personData: PersonData) {
  const links: { label: string; href: string }[] = []
  if (personData.url) {
    links.push({ label: 'Website', href: personData.url })
  }
  for (const href of personData.sameAs || []) {
    links.push({ label: labelForUrl(href), href })
  }
  return links
}

function labelForUrl(href: string) {
  try {
    const host = new URL(href).hostname.replace(/^www\./, '')
    if (host.includes('github.com')) return 'GitHub'
    if (host.includes('x.com') || host.includes('twitter.com')) return 'X'
    if (host.includes('linkedin.com')) return 'LinkedIn'
    return host
  } catch {
    return href
  }
}
