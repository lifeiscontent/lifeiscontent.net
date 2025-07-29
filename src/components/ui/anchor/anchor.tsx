import { getAnchorStyles, type AnchorStyleProps } from './anchor-styles'

export type AnchorProps = AnchorStyleProps & React.ComponentProps<'a'>

export function Anchor({ variant, underline, ...htmlProps }: AnchorProps) {
  return <a className={getAnchorStyles({ variant, underline })} {...htmlProps} />
}
