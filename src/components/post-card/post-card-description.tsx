import type { Post } from '@/lib/blog'

export type PostCardDescriptionProps = {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
}

export function PostCardDescription({ post, variant = 'default' }: PostCardDescriptionProps) {
  const className = {
    default: 'mt-4 text-base leading-6 text-gray-600',
    featured: 'mt-4 line-clamp-3 text-sm leading-6 text-gray-600',
    compact: 'mt-3 line-clamp-3 text-xs leading-5 text-gray-600 sm:mt-4 sm:text-sm sm:leading-6',
  }[variant]

  return <p className={className}>{post.description}</p>
}
