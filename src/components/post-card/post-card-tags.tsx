import { BadgeLink } from '@/components/ui/badge'
import type { Post } from '@/lib/blog'

export type PostCardTagsProps = {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
}

export function PostCardTags({ post, variant = 'default' }: PostCardTagsProps) {
  const maxTags = variant === 'compact' ? 2 : variant === 'featured' ? 3 : post.tags.length
  const containerClassName =
    variant === 'compact'
      ? 'mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2'
      : 'mt-6 flex flex-wrap gap-2'

  return (
    <div className={containerClassName}>
      {post.tags.slice(0, maxTags).map((tag) => (
        <BadgeLink key={tag} href={`/blog/tag/${tag}`} variant="default" size="xs">
          {tag}
        </BadgeLink>
      ))}
    </div>
  )
}
