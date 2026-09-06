import type { Project } from '../data/site'

interface GalleryCardProps {
  project: Project
  className?: string
}

export function GalleryCard({ project, className = '' }: GalleryCardProps) {
  return (
    <figure className={`group relative overflow-hidden bg-beige ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.src}
          alt={`${project.name} — ${project.description}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
      </div>

      {/* Persistent gradient + caption on mobile; hover-reveal on desktop */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent pt-20 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100" />

      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:translate-y-3 md:p-8 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.25em] text-beige">
          {project.category}
        </span>
        <h3 className="font-serif text-xl font-light text-ivory md:text-2xl">
          {project.name}
        </h3>
        <p className="mt-1 max-w-sm text-sm font-light leading-relaxed text-beige/90">
          {project.description}
        </p>
      </figcaption>
    </figure>
  )
}