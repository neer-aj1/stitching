/**
 * A subtle, lightweight 3D-style embroidery hoop rendered with CSS transforms.
 * Chosen over a Three.js bundle to keep the hero fast and elegant — the hoop
 * is a quiet, floating accent rather than the hero of the page.
 *
 * The `hoop-spin` keyframes live in index.css.
 */
export function ThreadHoop() {
  return (
    <div
      className="relative h-40 w-40"
      style={{ perspective: '800px' }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 animate-[hoop-spin_26s_linear_infinite]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 rounded-full border-[10px] border-[#b8865a]"
          style={{
            boxShadow:
              'inset 0 0 12px rgba(0,0,0,0.15), 0 18px 40px -12px rgba(43,35,28,0.4)',
          }}
        >
          <div className="absolute inset-[8px] overflow-hidden rounded-full bg-beige-deep/60">
            <div className="absolute left-1/2 top-1/2 h-px w-20 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-terracotta/80" />
            <div className="absolute left-1/2 top-1/2 h-px w-20 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-terracotta/80" />
          </div>
        </div>
        <div className="absolute inset-[18px] rounded-full border border-charcoal/20" />
      </div>
    </div>
  )
}