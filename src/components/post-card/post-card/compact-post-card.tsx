import type { Post } from '@/lib/blog'
import { PostCardMeta } from '../post-card-meta'
import { PostCardTitle } from '../post-card-title'
import { PostCardDescription } from '../post-card-description'
import { PostCardTags } from '../post-card-tags'

export type CompactPostCardProps = {
  post: Post
  variant: 'compact'
}

export function CompactPostCard({ post }: CompactPostCardProps) {
  return (
    <article className="group relative rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 sm:p-6">
      <PostCardMeta post={post} layout="compact" />
      <div className="group relative">
        <PostCardTitle post={post} variant="compact" />
        <PostCardDescription post={post} variant="compact" />
      </div>
      <PostCardTags post={post} variant="compact" />
    </article>
  )
}
