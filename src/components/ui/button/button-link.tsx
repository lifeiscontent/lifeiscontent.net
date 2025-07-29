import Link from 'next/link'
import { forwardRef } from 'react'
import { getButtonStyles, type ButtonStyleProps } from './button-styles'

export type ButtonLinkProps = {
  href: string
  children: React.ReactNode
} & ButtonStyleProps &
  Omit<React.ComponentProps<typeof Link>, 'href'>

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant, spacing, href, children, ...linkProps }, ref) => {
    return (
      <Link ref={ref} href={href} className={getButtonStyles({ variant, spacing })} {...linkProps}>
        {children}
      </Link>
    )
  }
)

ButtonLink.displayName = 'ButtonLink'
