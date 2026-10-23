export default function Loading() {
  return (
    <main className="page-intro wrap" aria-busy="true">
      <div className="skeleton" style={{ width: 120 }} />
      <div className="skeleton" style={{ width: '60%', height: 42 }} />
      <div className="skeleton" style={{ width: '80%' }} />
    </main>
  )
}
