import type { ReactNode } from 'react'

export function SupplyParallax({ src, children }: { src: string; children: ReactNode }) {
  return (
    <section className="gv-supply-parallax" style={{ backgroundImage: `url("${src}")` }}>
      <div className="gv-supply-parallax-copy">{children}</div>
    </section>
  )
}
