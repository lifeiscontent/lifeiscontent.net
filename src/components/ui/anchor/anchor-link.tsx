import Link from 'next/link'
import { getAnchorStyles, type AnchorStyleProps } from './anchor-styles'

export type AnchorLinkProps = {
  href: string
  children: React.ReactNode
} & AnchorStyleProps

export function AnchorLink({ href, variant, underline, children }: AnchorLinkProps) {
  return (
    <Link href={href} className={getAnchorStyles({ variant, underline })}>
      {children}
    </Link>
  )
}
