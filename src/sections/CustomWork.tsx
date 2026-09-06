import { Button } from '../components/Button'
import { CustomDesigner } from '../components/CustomDesigner'
import { SectionHeading } from '../components/SectionHeading'
import { contactEmail } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export function CustomWork() {
  const ref = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="custom" className="bg-charcoal px-5 py-20 text-ivory md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Intro */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Custom Work"
              tone="light"
              title="Have something in mind?"
              description="From initials and names to completely custom artwork, let's turn your idea into something you can wear, keep, and remember."
            />

            <div className="reveal mt-8 space-y-4 text-sm font-light leading-relaxed text-ivory/70" data-delay="100">
              <p>
                Start by designing your piece below — choose your letters, thread,
                fabric and accent, then request it in one click.
              </p>
              <p className="text-sm">
                Prefer to describe it instead?
              </p>
            </div>

            <div className="reveal mt-6" data-delay="150">
              <Button href={`mailto:${contactEmail}`} size="lg" variant="solid">
                Request a Custom Piece
              </Button>
            </div>
          </div>

          {/* Designer */}
          <div className="reveal lg:col-span-7" data-delay="100">
            <CustomDesigner />
          </div>
        </div>
      </div>
    </section>
  )
}