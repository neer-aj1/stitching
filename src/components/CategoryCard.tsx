import type { Category } from '../data/site'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-beige">
      <img
        src={category.src}
        alt={category.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <h3 className="font-serif text-xl font-light text-ivory md:text-[1.7rem]">
          {category.name}
        </h3>
        <p className="mt-2 text-xs font-light leading-relaxed text-beige/90 md:text-[0.95rem]">
          {category.description}
        </p>
      </div>
      <span className="pointer-events-none absolute inset-x-6 top-6 h-px scale-x-0 bg-ivory/60 transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  )
}
