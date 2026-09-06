import { SectionHeading } from '../components/SectionHeading'
import { Testimonial } from '../components/Testimonial'
import { useReveal } from '../hooks/useReveal'
import { testimonials } from '../data/site'

export function Testimonials() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="bg-beige/30 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Kind Words"
          title="From people who received something handmade."
          align="center"
          className="mb-14 md:mb-20"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={t.name} data-delay={i * 100} className="h-full">
              <Testimonial testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
