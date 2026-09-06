import { SectionHeading } from '../components/SectionHeading'
import { useParallax } from '../hooks/useParallax'
import { useReveal } from '../hooks/useReveal'
import { images } from '../data/site'

export function About() {
  const ref = useReveal<HTMLElement>()
  const parallaxRef = useParallax<HTMLImageElement>(0.04, 1.15)

  return (
    <section id="about" ref={ref} className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12">
        {/* Portrait / studio */}
        <div className="reveal order-2 lg:order-1 lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-sm border border-beige-deep/50" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-sm shadow-xl shadow-charcoal/10">
              <img
                ref={parallaxRef}
                src={images.story}
                alt="The studio workspace"
                loading="lazy"
                className="relative aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story copy */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionHeading
            eyebrow="About the Studio"
            title="Made slowly. Made personally."
          />

          <div className="mt-8 space-y-5 text-base font-light leading-relaxed text-charcoal-soft md:text-lg">
            <p className="reveal max-w-xl" data-delay="100">
              Everything you see here was made by hand — one stitch at a time, at a
              small table with a lamp, a needle, and a quiet stack of thread.
            </p>
            <p className="reveal max-w-xl" data-delay="200">
              We don't hurry. The small imperfections — a slightly uneven stitch, a
              thread that catches the light a little differently — are not flaws.
              They're the proof that a real person made this for you.
            </p>
            <p className="reveal max-w-xl" data-delay="300">
              Each piece is an original. And because we work one at a time, there's
              room in every order for your story.
            </p>
          </div>

          <div className="reveal mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:max-w-lg" data-delay="350">
            {[
              ['100%', 'Handmade'],
              ['1 of 1', 'Every piece'],
              ['Slow', 'By design'],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-beige-deep/50 pt-4">
                <p className="font-serif text-2xl font-light text-terracotta">{value}</p>
                <p className="mt-1 text-xs font-light uppercase tracking-[0.2em] text-charcoal-soft">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
