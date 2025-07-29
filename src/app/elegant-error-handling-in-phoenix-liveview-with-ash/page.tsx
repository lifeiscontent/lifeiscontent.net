'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ElegantErrorHandlingRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect immediately when the component mounts
    router.replace('/blog/elegant-error-handling-in-phoenix-liveview-with-ash')
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold text-gray-900">Redirecting...</h1>
        <p className="mb-6 text-gray-600">You&apos;re being redirected to the blog post.</p>
        <Link
          href="/blog/elegant-error-handling-in-phoenix-liveview-with-ash"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Click here if you&apos;re not redirected automatically
        </Link>
      </div>
    </div>
  )
}
