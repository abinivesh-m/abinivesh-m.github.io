export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="text-sm font-medium text-slate-300">Loading 3D portfolio…</p>
      </div>
    </main>
  )
}