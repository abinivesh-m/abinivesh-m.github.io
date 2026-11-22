import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="mb-4 text-5xl font-black text-white">Page not found</h1>
      <p className="mb-8 max-w-md text-slate-300">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:bg-blue-600">
        Back to portfolio
      </Link>
    </main>
  )
}