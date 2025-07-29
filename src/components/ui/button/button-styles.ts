export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSpacing = 'md' | 'lg'

export type ButtonStyleProps = {
  variant?: ButtonVariant
  spacing?: ButtonSpacing
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
}

const spacingStyles: Record<ButtonSpacing, string> = {
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
}

export function getButtonStyles({ variant = 'primary', spacing = 'md' }: ButtonStyleProps): string {
  const baseStyles =
    'inline-flex items-center justify-center text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  return `${baseStyles} ${variantStyles[variant]} ${spacingStyles[spacing]}`.trim()
}
