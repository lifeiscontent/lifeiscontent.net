import Link from 'next/link'
import type { Post } from '@/lib/blog'

export type PostCardTitleProps = {
  post: Post
  variant?: 'default' | 'compact'
}

export function PostCardTitle({ post, variant = 'default' }: PostCardTitleProps) {
  const className =
    variant === 'compact'
      ? 'group-hover:text-primary-600 text-base leading-6 font-semibold text-gray-900 sm:text-lg'
      : 'text-xl leading-6 font-semibold text-gray-900 group-hover:text-gray-600'

  return (
    <h3 className={className}>
      <Link href={`/blog/${post.slug}`}>
        <span className="absolute inset-0" />
        {post.title}
      </Link>
    </h3>
  )
}
