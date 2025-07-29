export type InlineCodeProps = {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  text?: 'xs' | 'sm' | 'base'
} & React.ComponentProps<'code'>

export function InlineCode({ variant = 'default', text = 'sm', ...htmlProps }: InlineCodeProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  }

  const textStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
  }

  return (
    <code
      className={`rounded px-2 py-1 font-mono ${variantStyles[variant]} ${textStyles[text]}`}
      {...htmlProps}
    />
  )
}
