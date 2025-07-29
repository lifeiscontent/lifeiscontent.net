import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { CodeSwitcher } from './code-switcher'
import { InlineCode } from './inline-code'
import { Pre } from './pre'

// Base MDX components object for server-side usage
// Only includes custom logic that prose classes don't handle
export const mdxComponents: MDXComponents = {
  // Custom code components
  code: ({ children, ...props }) => <InlineCode {...props}>{children}</InlineCode>,
  pre: ({ children, ...props }) => <Pre {...props}>{children}</Pre>,

  // Custom link handling (internal vs external)
  a: ({ href, children, ...props }) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },

  // Custom components
  CodeSwitcher,
}
