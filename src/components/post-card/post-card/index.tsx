import { DefaultPostCard } from './default-post-card'
import { FeaturedPostCard } from './featured-post-card'
import { CompactPostCard } from './compact-post-card'

export type PostCardProps =
  | React.ComponentProps<typeof DefaultPostCard>
  | React.ComponentProps<typeof FeaturedPostCard>
  | React.ComponentProps<typeof CompactPostCard>

export function PostCard(props: PostCardProps) {
  switch (props.variant) {
    case 'featured':
      return <FeaturedPostCard {...props} />
    case 'compact':
      return <CompactPostCard {...props} />
    default:
      return <DefaultPostCard {...props} />
  }
}
