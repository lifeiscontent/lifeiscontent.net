import { CodeBlock } from './code-block'

export type PreProps = {
  children?: React.ReactNode
} & React.ComponentProps<'div'>

export function Pre({ children, ...htmlProps }: PreProps) {
  // Map common language aliases to proper syntax highlighter names
  const languageMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    react: 'jsx',
    vue: 'html',
    svelte: 'html',
    heex: 'html',
    eex: 'html',
    py: 'python',
    rs: 'rust',
    rb: 'ruby',
    go: 'go',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cs: 'csharp',
    php: 'php',
    swift: 'swift',
    kt: 'kotlin',
    scala: 'scala',
    clj: 'clojure',
    elm: 'elm',
    fs: 'fsharp',
    hs: 'haskell',
    lua: 'lua',
    perl: 'perl',
    r: 'r',
    dart: 'dart',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    less: 'less',
    html: 'html',
    xml: 'xml',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    toml: 'toml',
    ini: 'ini',
    sql: 'sql',
    md: 'markdown',
    markdown: 'markdown',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    powershell: 'powershell',
    ps1: 'powershell',
    dockerfile: 'dockerfile',
    graphql: 'graphql',
    elixir: 'elixir',
    ex: 'elixir',
    exs: 'elixir',
  }

  // Handle MDX code blocks with language detection
  if (children && typeof children === 'object' && 'props' in children) {
    const codeElement = children as any

    if (codeElement.props?.className) {
      // Extract language from className like "language-typescript" or "lang-js"
      const className = codeElement.props.className
      const languageMatch = className.match(/(?:language-|lang-)([a-zA-Z0-9]+)/)
      let language = languageMatch ? languageMatch[1] : 'text'

      // Extract filename if present in data attributes or meta
      let filename = codeElement.props['data-filename'] || codeElement.props.filename

      // Handle path-based syntax like "lifeiscontent.net/src/components/button.tsx#L1-10"
      if (!filename && className) {
        const pathMatch = className.match(/language-(.+?)(?:#L\d+(?:-\d+)?)?$/)
        if (pathMatch) {
          const fullPath = pathMatch[1]
          // Check if it looks like a file path (contains / and has extension)
          if (fullPath.includes('/') && fullPath.includes('.')) {
            filename = fullPath.split('/').pop() // Get just the filename
            // Extract language from file extension if not already set
            if (language === 'text') {
              const extension = filename?.split('.').pop()?.toLowerCase()
              language = languageMap[extension || ''] || 'text'
            }
          }
        }
      }

      // Apply language mapping
      language = languageMap[language] || language

      return (
        <CodeBlock language={language} filename={filename} {...htmlProps}>
          {codeElement.props.children}
        </CodeBlock>
      )
    }

    // Handle code element without className (plain text blocks)
    if (codeElement.props && typeof codeElement.props.children === 'string') {
      return (
        <CodeBlock language="text" {...htmlProps}>
          {codeElement.props.children}
        </CodeBlock>
      )
    }
  }

  // Handle direct string content
  if (typeof children === 'string') {
    return (
      <CodeBlock language="text" {...htmlProps}>
        {children}
      </CodeBlock>
    )
  }

  // Fallback for complex content - still use CodeBlock for consistent styling
  return (
    <CodeBlock language="text" {...htmlProps}>
      {children}
    </CodeBlock>
  )
}
