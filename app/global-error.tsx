'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-navy text-white">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-black">Something went wrong</h1>
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}