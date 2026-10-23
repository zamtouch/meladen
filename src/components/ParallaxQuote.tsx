export function ParallaxQuote({
  src,
  kicker,
  title,
  text,
}: {
  src: string
  kicker: string
  title: string
  text: string
}) {
  return (
    <section className="parallax-band" style={{ backgroundImage: `url("${src}")` }}>
      <div className="parallax-copy wrap">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  )
}
