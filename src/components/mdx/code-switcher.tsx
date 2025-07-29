'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface CodeFile {
  filename: string
  content: string
  language?: string
}

interface CodeSwitcherProps {
  files: CodeFile[]
}

// Map file extensions to syntax highlighter language identifiers
const getLanguageFromFilename = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase()

  const languageMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    vue: 'html',
    svelte: 'html',
    html: 'html',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    less: 'less',
    json: 'json',
    md: 'markdown',
    mdx: 'mdx',
    py: 'python',
    go: 'go',
    rs: 'rust',
    php: 'php',
    rb: 'ruby',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cs: 'csharp',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    yml: 'yaml',
    yaml: 'yaml',
    xml: 'xml',
    sql: 'sql',
    dockerfile: 'dockerfile',
    graphql: 'graphql',
    kt: 'kotlin',
    swift: 'swift',
    dart: 'dart',
    r: 'r',
    scala: 'scala',
    clj: 'clojure',
    elm: 'elm',
    fs: 'fsharp',
    hs: 'haskell',
    lua: 'lua',
    perl: 'perl',
    powershell: 'powershell',
    ps1: 'powershell',
    toml: 'toml',
    ini: 'ini',
    cfg: 'ini',
    conf: 'bash',
  }

  return languageMap[extension || ''] || 'text'
}

export function CodeSwitcher({ files }: CodeSwitcherProps) {
  const [activeFile, setActiveFile] = useState(0)

  if (!files || files.length === 0) {
    return null
  }

  const currentFile = files[activeFile]
  const language = currentFile.language || getLanguageFromFilename(currentFile.filename)

  return (
    <div className="not-prose my-6">
      {/* File tabs */}
      {files.length > 1 && (
        <div className="flex flex-wrap rounded-t-lg border-b border-gray-700 bg-gray-800">
          {files.map((file, index) => (
            <button
              key={file.filename}
              onClick={() => setActiveFile(index)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                index === activeFile
                  ? 'border-b-2 border-blue-400 bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } ${index === 0 ? 'rounded-tl-lg' : ''}`}
            >
              {file.filename}
            </button>
          ))}
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        {files.length === 1 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="rounded bg-gray-800 px-2 py-1 text-xs font-medium text-gray-400">
              {currentFile.filename}
            </span>
          </div>
        )}

        <div className={`overflow-hidden ${files.length > 1 ? 'rounded-b-lg' : 'rounded-lg'}`}>
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '14px',
              lineHeight: '1.5',
              borderRadius: files.length > 1 ? '0 0 0.5rem 0.5rem' : '0.5rem',
            }}
            showLineNumbers={false}
            wrapLines={false}
            wrapLongLines={true}
          >
            {currentFile.content.trim()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}
