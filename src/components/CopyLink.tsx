'use client'

import { useState } from 'react'

export function CopyLink({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className="button ghost-dark"
      type="button"
      onClick={async () => {
        const url = `${window.location.origin}/news/${slug}`
        await navigator.clipboard.writeText(url)
        setCopied(true)
      }}
    >
      {copied ? 'Link copied' : 'Copy link'}
    </button>
  )
}
