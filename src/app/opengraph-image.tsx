import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

// Image metadata
export const alt = 'lifeiscontent.net - Online Presence of Aaron Reisman'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
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
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 60,
          }}
        >
          {/* Large version of the icon */}
          <svg
            width="300"
            height="300"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 400V0L340 400H60ZM80 380H304L80 60V160L228 380H198L80 200V380Z"
              fill="#290070"
            />
          </svg>

          {/* Site branding */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              color: '#290070',
            }}
          >
            <h1
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                margin: 0,
                marginBottom: 20,
                lineHeight: 1,
              }}
            >
              lifeiscontent.net
            </h1>
            <p
              style={{
                fontSize: 32,
                margin: 0,
                opacity: 0.8,
                lineHeight: 1.2,
              }}
            >
              Online Presence of Aaron Reisman
            </p>
            <p
              style={{
                fontSize: 24,
                margin: 0,
                marginTop: 20,
                opacity: 0.6,
                lineHeight: 1.2,
              }}
            >
              Blog • Development • Technology
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
