import type { Testimonial as TestimonialType } from '../data/site'

interface TestimonialProps {
  testimonial: TestimonialType
}

export function Testimonial({ testimonial }: TestimonialProps) {
  return (
    <figure className="reveal flex h-full flex-col justify-between gap-8 border border-beige-deep/40 bg-ivory-soft p-8 md:p-10">
      <div>
        <svg
          className="mb-5 h-7 w-7 text-terracotta/60"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10.5 6.5C7 8.2 4.5 11.5 4.5 15.4c0 2.6 1.8 4.1 3.9 4.1 2 0 3.6-1.5 3.6-3.6 0-2-1.4-3.4-3.3-3.4-.3 0-.7 0-.9.1.3-2.2 2-4.3 4.1-5.3L10.5 6.5zm8 0c-3.5 1.7-6 5-6 8.9 0 2.6 1.8 4.1 3.9 4.1 2 0 3.6-1.5 3.6-3.6 0-2-1.4-3.4-3.3-3.4-.3 0-.7 0-.9.1.3-2.2 2-4.3 4.1-5.3L18.5 6.5z" />
        </svg>
        <blockquote className="font-serif text-xl font-light leading-relaxed text-charcoal md:text-[1.35rem]">
          “{testimonial.quote}”
        </blockquote>
      </div>
      <figcaption className="text-sm">
        <span className="font-medium text-charcoal">{testimonial.name}</span>
        <span className="mt-0.5 block text-charcoal-soft">{testimonial.location}</span>
      </figcaption>
    </figure>
  )
}
