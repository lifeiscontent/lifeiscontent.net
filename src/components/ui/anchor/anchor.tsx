import { getAnchorStyles } from './styles'
import type { AnchorStyleProps } from './styles'

export type AnchorProps = AnchorStyleProps & Omit<React.ComponentProps<'a'>, 'style' | 'className'>

export function Anchor({ variant, underline, ...htmlProps }: AnchorProps) {
  return <a className={getAnchorStyles({ variant, underline })} {...htmlProps} />
}
