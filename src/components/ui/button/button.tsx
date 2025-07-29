import { forwardRef } from 'react'
import { getButtonStyles, type ButtonStyleProps } from './button-styles'

export type ButtonProps = ButtonStyleProps & React.ComponentProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, spacing, ...htmlProps }, ref) => {
    return <button ref={ref} className={getButtonStyles({ variant, spacing })} {...htmlProps} />
  }
)

Button.displayName = 'Button'
