import { GalleryCard } from '../components/GalleryCard'
import { SectionHeading } from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/site'

export function FeaturedWork() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="work" ref={ref} className="bg-beige/30 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured Work"
          title="Made by hand. Meant to be remembered."
          description="A few pieces from the studio — each one begun with a single thread and finished by hand."
          align="center"
          className="mb-14 md:mb-20"
        />

        <div className="flex flex-col gap-5 md:gap-8">
          {/* Band 1 — wide on left, tall on right */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            <div
              className="reveal aspect-[4/3] md:aspect-auto md:h-[460px] lg:h-[560px] md:col-span-7"
              data-delay="0"
            >
              <GalleryCard project={projects[0]} className="h-full" />
            </div>
            <div
              className="reveal aspect-[4/5] md:h-[460px] lg:h-[560px] md:col-span-5"
              data-delay="100"
            >
              <GalleryCard project={projects[1]} className="h-full" />
            </div>
          </div>

          {/* Band 2 — tall on left, wide on right */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            <div
              className="reveal aspect-[4/5] md:h-[460px] lg:h-[560px] md:col-span-5 md:order-2"
              data-delay="0"
            >
              <GalleryCard project={projects[2]} className="h-full" />
            </div>
            <div
              className="reveal aspect-[4/3] md:h-[460px] lg:h-[560px] md:col-span-7 md:order-1"
              data-delay="100"
            >
              <GalleryCard project={projects[3]} className="h-full" />
            </div>
          </div>

          {/* Band 3 — standard + wide */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            <div
              className="reveal aspect-[4/5] md:h-[460px] lg:h-[560px] md:col-span-5"
              data-delay="0"
            >
              <GalleryCard project={projects[4]} className="h-full" />
            </div>
            <div
              className="reveal aspect-[4/3] md:h-[460px] lg:h-[560px] md:col-span-7"
              data-delay="100"
            >
              <GalleryCard project={projects[5]} className="h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}