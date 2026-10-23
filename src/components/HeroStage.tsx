'use client'

import { useEffect, useState, type ReactNode } from 'react'

const motions = ['kb-in', 'kb-left', 'kb-rise', 'kb-out', 'kb-right', 'kb-drift']
const HOLD_MS = 8000

function useFilm(count: number) {
  const [step, setStep] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (reduced || count < 2) return
    const timer = window.setInterval(() => setStep((current) => current + 1), HOLD_MS)
    return () => window.clearInterval(timer)
  }, [reduced, count])

  const active = reduced ? 0 : step % Math.max(count, 1)
  const cycle = Math.floor(step / Math.max(count, 1))
  const previous = step === 0 ? -1 : (step - 1) % Math.max(count, 1)
  return { active, cycle, previous }
}

export function HeroFilm({ slides }: { slides: string[] }) {
  const pictures = slides.filter(Boolean)
  const { active, cycle, previous } = useFilm(pictures.length)

  return (
    <div className="hero-slides" aria-hidden="true">
      {pictures.map((src, index) => {
        const shownCycle = index <= active ? cycle : Math.max(0, cycle - 1)
        const motion = motions[(index + shownCycle * 2) % motions.length]
        const role = index === active ? 'is-active' : index === previous ? 'is-hold' : ''
        return (
          <div className={`hero-slide ${role}`} key={src}>
            <img className={motion} src={src} alt="" fetchPriority={index === 0 ? 'high' : 'low'} />
          </div>
        )
      })}
    </div>
  )
}

export function HeroStage({ slides, children }: { slides: string[]; children: ReactNode }) {
  return (
    <section className="hero-stage">
      <HeroFilm slides={slides} />
      <div className="wrap">{children}</div>
    </section>
  )
}
