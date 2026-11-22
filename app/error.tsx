'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <h1 className="mb-4 text-4xl font-black text-white">Something went wrong</h1>
      <p className="mb-8 max-w-md text-slate-300">
        An unexpected error occurred. You can try reloading the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
      >
        Try again
      </button>
    </main>
  )
}