import type { Post } from '@/lib/blog'
import { PostCardMeta } from '../post-card-meta'
import { PostCardTitle } from '../post-card-title'
import { PostCardDescription } from '../post-card-description'
import { PostCardTags } from '../post-card-tags'

export type DefaultPostCardProps = {
  post: Post
  variant?: 'default'
}

export function DefaultPostCard({ post }: DefaultPostCardProps) {
  return (
    <article className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <PostCardMeta post={post} />
      <div className="group relative">
        <PostCardTitle post={post} />
        <PostCardDescription post={post} />
      </div>
      <PostCardTags post={post} />
    </article>
  )
}
