import Link from 'next/link'
import { getAnchorStyles } from './styles'
import type { AnchorStyleProps } from './styles'

export type AnchorLinkProps = AnchorStyleProps &
  Omit<React.ComponentProps<typeof Link>, 'style' | 'className'>

export function AnchorLink({ variant, underline, href, children, ...linkProps }: AnchorLinkProps) {
  return (
    <Link href={href} className={getAnchorStyles({ variant, underline })} {...linkProps}>
      {children}
    </Link>
  )
}
