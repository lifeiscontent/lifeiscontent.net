export type BadgeVariant = 'default' | 'subtle'
export type BadgeSize = 'xs' | 'sm'

export type BadgeStyleProps = {
  variant?: BadgeVariant
  size?: BadgeSize
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-gray-100 text-gray-800 hover:bg-gray-200 aria-[current]:bg-primary-100 aria-[current]:text-primary-900 aria-[current]:hover:bg-primary-200 aria-selected:bg-primary-100 aria-selected:text-primary-900 aria-selected:hover:bg-primary-200',
  subtle:
    'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 aria-[current]:bg-primary-100 aria-[current]:text-primary-900 aria-[current]:hover:bg-primary-200 aria-selected:bg-primary-100 aria-selected:text-primary-900 aria-selected:hover:bg-primary-200',
}

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
}

export function getBadgeStyles({ variant = 'default', size = 'xs' }: BadgeStyleProps): string {
  const baseStyles = 'inline-flex items-center rounded-md px-2 py-1 font-medium transition-colors'

  return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`
}
