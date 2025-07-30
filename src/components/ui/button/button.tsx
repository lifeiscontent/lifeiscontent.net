import { getButtonStyles } from './styles'
import type { ButtonStyleProps } from './styles'

export type ButtonProps = ButtonStyleProps &
  Omit<React.ComponentProps<'button'>, 'style' | 'className'>

export function Button({ variant, size, ...htmlProps }: ButtonProps) {
  return <button className={getButtonStyles({ variant, size })} {...htmlProps} />
}
