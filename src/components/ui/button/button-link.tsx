import Link from 'next/link'
import { getButtonStyles } from './styles'
import type { ButtonStyleProps } from './styles'

export type ButtonLinkProps = ButtonStyleProps &
  Omit<React.ComponentProps<typeof Link>, 'style' | 'className'>

export function ButtonLink({ variant, size, href, children, ...linkProps }: ButtonLinkProps) {
  return (
    <Link href={href} className={getButtonStyles({ variant, size })} {...linkProps}>
      {children}
    </Link>
  )
}
