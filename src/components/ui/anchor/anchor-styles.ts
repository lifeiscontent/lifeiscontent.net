export type AnchorVariant = 'primary' | 'secondary'
export type AnchorUnderline = 'always' | 'hover' | 'none'

export type AnchorStyleProps = {
  variant?: AnchorVariant
  underline?: AnchorUnderline
}

const variantStyles: Record<AnchorVariant, string> = {
  primary: 'text-primary-500 hover:text-primary-600',
  secondary: 'text-gray-700 hover:text-gray-900',
}

const underlineStyles: Record<AnchorUnderline, string> = {
  always: 'underline',
  hover: 'hover:underline',
  none: '',
}

export function getAnchorStyles({
  variant = 'secondary',
  underline = 'hover',
}: AnchorStyleProps): string {
  return `text-base transition-colors ${variantStyles[variant]} ${underlineStyles[underline]}`.trim()
}
