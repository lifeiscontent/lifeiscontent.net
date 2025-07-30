import type { Post } from '@/lib/blog'
import { PostCardMeta } from '../post-card-meta'
import { PostCardTitle } from '../post-card-title'
import { PostCardDescription } from '../post-card-description'
import { PostCardTags } from '../post-card-tags'

export type FeaturedPostCardProps = {
  post: Post
  variant: 'featured'
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="p-6">
        <PostCardMeta post={post} showFeaturedBadge />
        <div className="group relative">
          <PostCardTitle post={post} />
          <PostCardDescription post={post} variant="featured" />
        </div>
        <PostCardTags post={post} variant="featured" />
      </div>
    </article>
  )
}
