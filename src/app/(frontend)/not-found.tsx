import { Pill } from '@/components/GvHeader'

export default function NotFound() {
  return (
    <main className="page-intro wrap">
      <p className="kicker">Missing page</p>
      <h1>That page is not on this site</h1>
      <p>Meladen Energy publishes seven pages. The link you opened is not one of them.</p>
      <Pill href="/">Back to home</Pill>
    </main>
  )
}
