import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export type CodeBlockProps = {
  language?: string
  showLineNumbers?: boolean
  filename?: string
} & React.ComponentProps<'div'>

export function CodeBlock({
  language = 'text',
  showLineNumbers = false,
  filename,
  children,
  ...htmlProps
}: CodeBlockProps) {
  // Extract code content from children
  const code = typeof children === 'string' ? children : String(children || '')

  return (
    <div className="not-prose my-6" {...htmlProps}>
      {/* Filename header */}
      {filename && (
        <div className="flex items-center justify-between rounded-t-lg border-b border-gray-700 bg-gray-800 px-4 py-2">
          <span className="text-sm font-medium text-gray-300">{filename}</span>
        </div>
      )}

      {/* Code content */}
      <div className={`overflow-hidden ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '14px',
            lineHeight: '1.5',
            borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
          }}
          showLineNumbers={showLineNumbers}
          wrapLines={false}
          wrapLongLines={true}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
