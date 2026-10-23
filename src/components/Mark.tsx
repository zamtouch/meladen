export function heading(text: string) {
  return text.replace(/\.+\s*$/u, '')
}

export function Paragraphs({ text }: { text: string }) {
  return text.split(/\n\n/).map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)
}
