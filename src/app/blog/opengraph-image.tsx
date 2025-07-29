import { ImageResponse } from 'next/og'

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
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#290070', // primary-500 equivalent
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: 'bold',
              margin: 0,
              marginBottom: 30,
              lineHeight: 1,
            }}
          >
            Blog
          </h1>
          <p
            style={{
              fontSize: 36,
              margin: 0,
              opacity: 0.8,
              lineHeight: 1.2,
            }}
          >
            lifeiscontent.net
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
            Development • Technology • Insights
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
