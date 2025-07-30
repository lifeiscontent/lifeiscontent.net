import Link from 'next/link'
import { getBadgeStyles } from './styles'
import type { BadgeStyleProps } from './styles'

export type BadgeLinkProps = BadgeStyleProps &
  Omit<React.ComponentProps<typeof Link>, 'style' | 'className'>

export function BadgeLink({
  href,
  children,
  variant = 'default',
  size = 'xs',
  ...linkProps
}: BadgeLinkProps) {
  return (
    <Link href={href} className={getBadgeStyles({ variant, size })} {...linkProps}>
      {children}
    </Link>
  )
}
