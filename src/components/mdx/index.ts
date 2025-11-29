import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import Link from './link.astro'
import Pre from './pre.astro'

export const mdxComponents: Record<string, AstroComponentFactory> = {
  a: Link as AstroComponentFactory,
  pre: Pre as AstroComponentFactory,
}
