import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import { instagramUrl, studioItems } from '../data/site'

export function StudioGallery() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="From the Studio"
          title="A look at recent work."
          align="center"
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {studioItems.map((item, i) => (
            <div
              key={item.src}
              className="reveal aspect-square overflow-hidden"
              data-delay={(i % 6) * 60}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 flex justify-center" data-delay="200">
          <Button href={instagramUrl || '#custom'} variant="outline" size="md">
            See more work
          </Button>
        </div>
      </div>
    </section>
  )
}
