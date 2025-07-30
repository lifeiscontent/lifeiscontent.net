import { Badge } from '@/components/ui/badge'
import type { Post } from '@/lib/blog'

export type PostCardMetaProps = {
  post: Post
  layout?: 'default' | 'compact'
  showFeaturedBadge?: boolean
}

export function PostCardMeta({
  post,
  layout = 'default',
  showFeaturedBadge = false,
}: PostCardMetaProps) {
  const className =
    layout === 'compact'
      ? 'mb-3 flex flex-col gap-1 text-xs sm:mb-4 sm:flex-row sm:items-center sm:gap-x-4'
      : 'mb-4 flex items-center gap-x-4 text-xs'

  return (
    <div className={className}>
      <time dateTime={post.date} className="text-gray-500">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <span className="text-gray-500">{post.readingTime.text}</span>
      {showFeaturedBadge && (
        <Badge variant="default" size="xs" aria-selected="true">
          Featured
        </Badge>
      )}
    </div>
  )
}
