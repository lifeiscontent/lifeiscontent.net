import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

// Image metadata - Apple touch icon standard size
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: '32px',
        }}
      >
        <svg
          width="132"
          height="132"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 400V0L340 400H60ZM80 380H304L80 60V160L228 380H198L80 200V380Z"
            fill="#2a0072"
          />
        </svg>
      </div>
    ),
    {
      width: 180,
      height: 180,
    }
  )
}
