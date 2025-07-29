import Link from 'next/link'
import { getBadgeStyles, type BadgeStyleProps } from './badge-styles'

export type BadgeLinkProps = {
  href: string
  children: React.ReactNode
} & BadgeStyleProps

export function BadgeLink({
  href,
  children,
  variant = 'white-bg',
  text = 'xs',
  selected = false,
}: BadgeLinkProps) {
  return (
    <Link href={href} className={getBadgeStyles({ variant, text, selected })}>
      {children}
    </Link>
  )
}
