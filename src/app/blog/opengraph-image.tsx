import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

// Image metadata
export const alt = 'Blog - lifeiscontent.net'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Load Inter font from file system
  const interSemiBold = fs.readFileSync(path.join(process.cwd(), 'public/fonts/Inter-SemiBold.ttf'))
  const interRegular = fs.readFileSync(path.join(process.cwd(), 'public/fonts/Inter-Regular.ttf'))
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 80,
          }}
        >
          {/* Large version of the icon */}
          <svg
            width="280"
            height="280"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 400V0L340 400H60ZM80 380H304L80 60V160L228 380H198L80 200V380Z"
              fill="#2a0072"
            />
          </svg>

          {/* Site branding */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              maxWidth: '500px',
            }}
          >
            <h1
              style={{
                fontSize: 56,
                fontWeight: 600,
                margin: 0,
                marginBottom: 20,
                lineHeight: 1,
                color: 'black',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              Blog
            </h1>
            <p
              style={{
                fontSize: 24,
                margin: 0,
                color: '#6b7280',
                lineHeight: 1.4,
                maxWidth: '450px',
              }}
            >
              Latest thoughts and insights on development, technology, and life.
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  )
}
