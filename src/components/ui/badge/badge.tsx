import { getBadgeStyles, type BadgeStyleProps } from './badge-styles'

export type BadgeProps = BadgeStyleProps & React.ComponentProps<'span'>

export function Badge({ variant = 'white-bg', text = 'xs', selected, ...htmlProps }: BadgeProps) {
  // Check for legacy aria-selected prop for backward compatibility
  const isSelected =
    selected ?? (htmlProps['aria-selected'] === true || htmlProps['aria-selected'] === 'true')

  return <span className={getBadgeStyles({ variant, text, selected: isSelected })} {...htmlProps} />
}
