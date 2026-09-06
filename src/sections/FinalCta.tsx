import { contactEmail } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export function FinalCta() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="relative overflow-hidden bg-terracotta px-5 py-24 text-ivory md:px-10 md:py-36">
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #fff 0.5px, transparent 0.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="reveal text-xs font-medium uppercase tracking-[0.3em] text-ivory/70">
          Your Turn
        </span>
        <h2
          className="reveal mt-6 font-serif text-4xl font-light leading-[1.05] tracking-tight text-ivory text-balance md:text-6xl"
          data-delay="100"
        >
          Let's make something <em className="italic">personal.</em>
        </h2>
        <p
          className="reveal mt-6 max-w-xl text-base font-light leading-relaxed text-ivory/85 md:text-lg"
          data-delay="200"
        >
          Tell us what you're imagining. We'll turn the idea into thread, stitch by
          stitch.
        </p>
        <div className="reveal mt-10" data-delay="300">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/40 px-9 py-4 text-sm font-medium tracking-wide text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:border-ivory hover:bg-ivory hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory/50 focus-visible:ring-offset-2 focus-visible:ring-offset-terracotta"
          >
            Start a Custom Order
          </a>
        </div>
      </div>
    </section>
  )
}
