import { CategoryCard } from '../components/CategoryCard'
import { SectionHeading } from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import { categories } from '../data/site'

export function Categories() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="categories" ref={ref} className="bg-beige/30 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Product Categories"
          title="Things we make, by hand."
          description="From the smallest handkerchief to larger fabric art — every piece is produced slowly, at the studio."
          align="center"
          className="mb-14 md:mb-20"
        />

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-5">
          {categories.map((category, i) => (
            <div
              key={category.name}
              className={`reveal ${i === 0 ? 'col-span-2 lg:col-span-1' : ''}`}
              data-delay={(i % 5) * 80}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
