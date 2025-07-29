import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 400V0L340 400H60ZM80 380H304L80 60V160L228 380H198L80 200V380Z"
            fill="#290070"
          />
        </svg>
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}
