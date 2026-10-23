'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { nav } from '@/content/site'

function Arrow({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

export function Pill({ href, children, tone = 'blue' }: { href: string; children: React.ReactNode; tone?: 'blue' | 'light' }) {
  return (
    <Link className={tone === 'light' ? 'gv-pill gv-pill-light' : 'gv-pill'} href={href}>
      {children}
      <span aria-hidden="true"><Arrow size={14} /></span>
    </Link>
  )
}

export function GvHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = nav.filter((item) => item.href !== '/contact')

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="gv-header">
      <div className="gv-nav">
        <Link className="gv-brand" href="/" aria-label="Meladen Energy home" onClick={() => setOpen(false)}>
          <img src="/brand/logo.png" alt="" />
        </Link>
        <nav className={open ? 'gv-links gv-links-open' : 'gv-links'} aria-label="Primary">
          {links.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
        </nav>
        <div className="gv-actions">
          <Link className="gv-contact" href="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>Contact Us <Arrow /></Link>
          <button className="gv-menu" type="button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  )
}
