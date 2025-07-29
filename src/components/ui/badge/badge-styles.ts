export type BadgeVariant = 'white-bg' | 'gray-bg'
export type BadgeTextSize = 'xs' | 'sm'

export type BadgeStyleProps = {
  variant?: BadgeVariant
  text?: BadgeTextSize
  selected?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  'white-bg': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  'gray-bg': 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200',
}

const selectedStyles = 'bg-primary-100 text-primary-900 hover:bg-primary-200'

const textStyles: Record<BadgeTextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
}

export function getBadgeStyles({
  variant = 'white-bg',
  text = 'xs',
  selected = false,
}: BadgeStyleProps): string {
  const baseStyles = 'inline-flex items-center rounded-md px-2 py-1 font-medium transition-colors'
  const colorStyles = selected ? selectedStyles : variantStyles[variant]

  return `${baseStyles} ${colorStyles} ${textStyles[text]}`
}
