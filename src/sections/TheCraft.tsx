import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { useParallax } from '../hooks/useParallax'
import { useReveal } from '../hooks/useReveal'
import { craftSteps, images } from '../data/site'

export function TheCraft() {
  const ref = useReveal<HTMLElement>()
  const parallaxRef = useParallax<HTMLImageElement>(0.05, 1.15)

  return (
    <section ref={ref} className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Imagery */}
          <div className="lg:col-span-5">
            <div className="reveal relative">
              <div className="overflow-hidden">
                <img
                  ref={parallaxRef}
                  src={images.craft.thread}
                  alt="Spools of silk thread"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden w-44 overflow-hidden rounded-sm border-4 border-ivory shadow-xl shadow-charcoal/15 md:block">
                <img
                  src={images.craft.needle}
                  alt="Cross stitch close-up"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
            <p className="reveal mt-10 max-w-xs text-sm font-light italic leading-relaxed text-charcoal-soft" data-delay="150">
              “Patience is the thread that ties every piece together.”
            </p>
          </div>

          {/* Steps */}
          <div className="lg:col-span-7">
            <div className="lg:pt-4">
              <SectionHeading
                eyebrow="The Craft"
                title="Every piece starts with a thread."
              />
            </div>

            <div className="mt-12">
              <ol className="space-y-10">
                {craftSteps.map((step, i) => (
                  <li
                    key={step.number}
                    className="reveal grid grid-cols-[auto_1fr] gap-6 border-b border-beige-deep/40 pb-10 md:grid-cols-[5rem_1fr] md:gap-10"
                    data-delay={i * 90}
                  >
                    <span className="font-serif text-3xl font-light text-terracotta/70">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-light text-charcoal">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm font-light leading-relaxed text-charcoal-soft md:text-[0.95rem]">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="reveal mt-12" data-delay="200">
              <Button href="#custom" variant="outline">
                See the process in your piece
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
