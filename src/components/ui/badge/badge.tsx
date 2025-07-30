import { getBadgeStyles } from './styles'
import type { BadgeStyleProps } from './styles'

export type BadgeProps = BadgeStyleProps & Omit<React.ComponentProps<'span'>, 'style' | 'className'>

export function Badge({ variant = 'default', size = 'xs', ...htmlProps }: BadgeProps) {
  return <span className={getBadgeStyles({ variant, size })} {...htmlProps} />
}
