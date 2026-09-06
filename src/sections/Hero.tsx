import { Button } from '../components/Button'
import { images } from '../data/site'
import { ThreadHoop } from '../components/ThreadHoop'
import { useParallax } from '../hooks/useParallax'

export function Hero() {
  const parallaxRef = useParallax<HTMLImageElement>(0.05, 1.12)

  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(184,85,47,0.06), transparent 40%), radial-gradient(circle at 85% 80%, rgba(184,85,47,0.05), transparent 45%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-10 md:px-10 md:pb-24 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        {/* Text */}
        <div className="relative z-10 lg:col-span-6">
          <span
            className="animate-fade-up inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-terracotta"
            style={{ animationDelay: '100ms' }}
          >
            <span className="h-px w-8 bg-terracotta/50" aria-hidden="true" />
            Handmade · Slow Crafted · One Stitch at a Time
          </span>

          <h1
            className="animate-fade-up mt-7 font-serif text-[2.7rem] font-light leading-[1.02] tracking-tight text-charcoal md:text-7xl"
            style={{ animationDelay: '250ms' }}
          >
            Threads,
            <br />
            turned into <em className="italic text-terracotta">art.</em>
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-md text-base font-light leading-relaxed text-charcoal-soft md:text-lg"
            style={{ animationDelay: '400ms' }}
          >
            Handcrafted embroidery and threadwork, made with patience, detail, and a
            little imagination.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '550ms' }}
          >
            <Button href="#work" size="lg">
              Explore the Work
            </Button>
            <Button href="#custom" variant="outline" size="lg">
              Create Something Custom
            </Button>
          </div>
        </div>

        {/* Visual hero */}
        <div className="relative lg:col-span-6">
          <div
            className="animate-fade-up relative mx-auto max-w-md lg:max-w-none"
            style={{ animationDelay: '450ms' }}
          >
            {/* Frame */}
            <div className="relative overflow-hidden rounded-t-[14rem] rounded-b-sm border border-beige-deep/50">
              <img
                ref={parallaxRef}
                src={images.hero.main}
                alt="Detail of hand embroidered threadwork"
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 to-transparent" />
            </div>

            {/* Floating detail card */}
            <div className="animate-fade-up absolute -left-3 top-10 hidden w-40 -rotate-6 overflow-hidden rounded-sm border border-beige-deep/40 bg-ivory-soft/90 p-2 shadow-xl shadow-charcoal/10 backdrop-blur-sm sm:block lg:-left-10">
              <img
                src={images.hero.detail}
                alt="Close-up of stitching"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </div>
            <div
              className="animate-fade-up absolute -right-2 bottom-6 flex rotate-3 items-center gap-3 rounded-full border border-beige-deep/40 bg-ivory-soft/95 px-5 py-3 shadow-xl shadow-charcoal/10 backdrop-blur-sm"
              style={{ animationDelay: '600ms' }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-terracotta" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal">
                Made by hand
              </span>
            </div>
          </div>

          {/* Subtle 3D hoop */}
          <div className="absolute -left-16 bottom-4 hidden xl:block">
            <ThreadHoop />
          </div>
        </div>
      </div>
    </section>
  )
}
