import type { MDXComponents } from 'mdx/types'
import Link from './link.astro'
import Pre from './pre.astro'

export const mdxComponents: MDXComponents = {
  a: Link,
  pre: Pre,
}
