import { useMemo, useRef, useState } from 'react'
import type { DragEvent, ReactNode } from 'react'
import html2canvas from 'html2canvas'
import { Button } from './Button'
import { contactEmail } from '../data/site'

/* ============================ TYPES ============================ */

export type FontStyle = 'script' | 'serif' | 'modern'
export type Density = 'fine' | 'medium' | 'bold'
export type SizeId = 'small' | 'medium' | 'large'

interface Swatch {
  name: string
  hex: string
}

interface SegOption<T extends string> {
  value: T
  label: string
}

export type DecorId = 'flower' | 'leaf' | 'sparkle' | 'heart' | 'star' | 'butterfly'

interface PlacedDeco {
  id: number
  type: DecorId
  x: number
  y: number
}

/* ============================ DATA ============================ */

const threadOptions: Swatch[] = [
  { name: 'Terracotta', hex: '#b4552f' },
  { name: 'Sage', hex: '#8d9483' },
  { name: 'Dusty Rose', hex: '#c29483' },
  { name: 'Golden', hex: '#b98a3e' },
  { name: 'Charcoal', hex: '#2b231c' },
  { name: 'Ivory', hex: '#f4eddf' },
]

const fabricOptions: Swatch[] = [
  { name: 'Ivory linen', hex: '#efe6d7' },
  { name: 'Natural beige', hex: '#e2d5c0' },
  { name: 'Blush', hex: '#dcc3b5' },
  { name: 'Sage', hex: '#c8cdc0' },
  { name: 'Charcoal', hex: '#2b231c' },
]

const fontOptions: SegOption<FontStyle>[] = [
  { value: 'script', label: 'Script' },
  { value: 'serif', label: 'Serif' },
  { value: 'modern', label: 'Modern' },
]

const densityOptions: SegOption<Density>[] = [
  { value: 'fine', label: 'Fine' },
  { value: 'medium', label: 'Medium' },
  { value: 'bold', label: 'Bold' },
]

const sizeOptions: SegOption<SizeId>[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

const sizeSpecs: Record<SizeId, { ring: string; factor: number; px: number }> = {
  small: { ring: '2.5″ hoop', factor: 0.78, px: 96 },
  medium: { ring: '3.5″ hoop', factor: 1, px: 128 },
  large: { ring: '5″ hoop', factor: 1.3, px: 168 },
}

const initialSuggestions = ['A', 'AM', 'EL', 'RS', 'Bloom', 'Cozy', 'Stitch']

/* ============================ DECORATIONS ============================ */

const decorOptions: { id: DecorId; label: string }[] = [
  { id: 'flower', label: 'Flower' },
  { id: 'leaf', label: 'Leaf' },
  { id: 'sparkle', label: 'Sparkle' },
  { id: 'heart', label: 'Heart' },
  { id: 'star', label: 'Star' },
  { id: 'butterfly', label: 'Butterfly' },
]

const decorPaths: Record<DecorId, ReactNode> = {
  flower: (
    <>
      <path d="M2 9a10 10 0 1 0 20 0" />
      <path d="M12 19a10 10 0 0 1 10 -10" />
      <path d="M2 9a10 10 0 0 1 10 10" />
      <path d="M12 4a9.7 9.7 0 0 1 2.99 7.5" />
      <path d="M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
      <path d="M7.5 15q -3.5 0 -4.5 -6a8.4 8.4 0 0 1 3.438 .402a12 12 0 0 1 -.052 -.793c0 -3.606 3.204 -5.609 3.204 -5.609s2.003 1.252 2.842 3.557q 2.568 -1.557 6.568 -1.557q .396 3.775 -1.557 6.568c2.305 .839 3.557 2.842 3.557 2.842s-3 2.59 -7 2.59c0 1 0 1 .5 3q -6 0 -7 -5" />
    </>
  ),
  sparkle: (
    <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />
  ),
  heart: (
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  ),
  star: (
    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" />
  ),
  butterfly: (
    <>
      <path d="M12 18.176a3 3 0 1 1 -4.953 -2.449l-.025 .023a4.502 4.502 0 0 1 1.483 -8.75c1.414 0 2.675 .652 3.5 1.671a4.5 4.5 0 1 1 4.983 7.079a3 3 0 1 1 -4.983 2.25l-.005 .176" />
      <path d="M12 19v-10" />
      <path d="M9 3l3 2l3 -2" />
    </>
  ),
}

const decorStitches: Record<DecorId, number> = {
  flower: 260,
  leaf: 200,
  sparkle: 150,
  heart: 170,
  star: 180,
  butterfly: 320,
}

/* ============================ GLYPHS ============================ */

function DecorGlyph({ id, className, strokeWidth = 1.5 }: { id: DecorId; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {decorPaths[id]}
    </svg>
  )
}

/* ===================== SMALL FIELD COMPONENTS ===================== */

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="mb-2.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-charcoal-soft">
        {label}
      </span>
      {children}
    </div>
  )
}

function SegmentGroup<T extends string>({
  options,
  value,
  onChange,
  renderLabel,
}: {
  options: SegOption<T>[]
  value: T
  onChange: (v: T) => void
  renderLabel?: (opt: SegOption<T>) => ReactNode
}) {
  return (
    <div className="inline-flex flex-wrap rounded-full border border-beige-deep/60 p-1">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`flex min-w-11 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${
              active
                ? 'bg-charcoal text-ivory shadow-sm'
                : 'text-charcoal-soft hover:text-charcoal'
            }`}
          >
            {renderLabel ? renderLabel(opt) : opt.label}
          </button>
        )
      })}
    </div>
  )
}

function SwatchGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: Swatch[]
  value: number
  onChange: (i: number) => void
}) {
  return (
    <div>
      <span className="mb-2.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-charcoal-soft">
        {label}
      </span>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt, i) => (
          <button
            key={opt.name}
            type="button"
            onClick={() => onChange(i)}
            aria-label={opt.name}
            aria-pressed={value === i}
            title={opt.name}
            className={`h-8 w-8 rounded-full transition-all duration-300 ${
              value === i
                ? 'scale-110 ring-2 ring-terracotta ring-offset-2 ring-offset-ivory'
                : 'ring-1 ring-charcoal/15 hover:scale-110'
            }`}
            style={{ backgroundColor: opt.hex }}
          />
        ))}
      </div>
    </div>
  )
}

/* ======================== MAIN DESIGNER ======================== */

export function CustomDesigner() {
  const [initials, setInitials] = useState('A')
  const [font, setFont] = useState<FontStyle>('serif')
  const [thread, setThread] = useState(0)
  const [fabric, setFabric] = useState(0)
  const [density, setDensity] = useState<Density>('medium')
  const [size, setSize] = useState<SizeId>('medium')
  const [decorations, setDecorations] = useState<PlacedDeco[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const fabricRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const dragCounter = useRef(0)

  const threadColor = useMemo(() => threadOptions[thread]?.hex ?? '#b4552f', [thread])
  const fabricColor = useMemo(() => fabricOptions[fabric]?.hex ?? '#efe6d7', [fabric])

  const letterFont = font === 'script' ? 'font-serif italic' : font === 'serif' ? 'font-serif' : 'font-sans tracking-[0.05em]'
  const letterWeight =
    density === 'fine' ? 'font-light' : density === 'medium' ? 'font-normal' : 'font-semibold'

  const charCount = Math.max(initials.length, 1)
  const sizeScale = charCount <= 1 ? 1 : charCount <= 2 ? 0.7 : charCount <= 3 ? 0.58 : charCount <= 4 ? 0.5 : charCount <= 5 ? 0.42 : charCount <= 6 ? 0.36 : 0.31
  const letterPx = Math.round(sizeSpecs[size].px * sizeScale)

  const stitchCount = useMemo(() => {
    const densityF = density === 'fine' ? 1.15 : density === 'medium' ? 1 : 0.85
    const sizeF = sizeSpecs[size].factor
    const base = 620 + 210 * (charCount - 1)
    const decoStitchTotal = decorations.reduce((sum, d) => sum + (decorStitches[d.type] ?? 0), 0)
    const total = base * densityF * sizeF + decoStitchTotal
    return Math.round(total / 10) * 10
  }, [density, size, charCount, decorations])

  const decoSummary = useMemo(() => {
    const counts = new Map<DecorId, number>()
    decorations.forEach((d) => counts.set(d.type, (counts.get(d.type) ?? 0) + 1))
    return (
      [...counts.entries()]
        .map(([t, c]) => `${c} × ${decorOptions.find((o) => o.id === t)?.label}`)
        .join(', ') || 'None'
    )
  }, [decorations])

  const addDeco = (type: DecorId, x: number, y: number) =>
    setDecorations((prev) => [...prev, { id: Date.now(), type, x, y }])

  const onPaletteDragStart = (e: DragEvent<HTMLButtonElement>, type: DecorId) => {
    e.dataTransfer.setData('application/x-threadwork-deco', type)
    e.dataTransfer.setData('application/x-threadwork-move', '')
    e.dataTransfer.effectAllowed = 'copy'
  }

  const onPlacedDragStart = (e: DragEvent<HTMLDivElement>, deco: PlacedDeco) => {
    e.dataTransfer.setData('application/x-threadwork-move', String(deco.id))
    e.dataTransfer.effectAllowed = 'move'
  }

  const onFabricDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragCounter.current += 1
    setIsDragOver(true)
  }

  const onFabricDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = e.dataTransfer.types.includes('application/x-threadwork-move')
      ? 'move'
      : 'copy'
  }

  const onFabricDragLeave = () => {
    dragCounter.current -= 1
    if (dragCounter.current <= 0) {
      dragCounter.current = 0
      setIsDragOver(false)
    }
  }

  const onFabricDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragCounter.current = 0
    setIsDragOver(false)
    const el = fabricRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.min(90, Math.max(10, Math.round(((e.clientX - rect.left) / rect.width) * 100)))
    const y = Math.min(90, Math.max(10, Math.round(((e.clientY - rect.top) / rect.height) * 100)))
    const moveId = e.dataTransfer.getData('application/x-threadwork-move')
    if (moveId) {
      setDecorations((prev) => prev.map((d) => (d.id === Number(moveId) ? { ...d, x, y } : d)))
      return
    }
    const type = e.dataTransfer.getData('application/x-threadwork-deco') as DecorId
    if (type in decorPaths) addDeco(type, x, y)
  }

  const removeDeco = (id: number) => setDecorations((prev) => prev.filter((d) => d.id !== id))

  const clearDecos = () => setDecorations([])

  const [isCapturing, setIsCapturing] = useState(false)

  const capturePreview = async () => {
    const el = previewRef.current
    if (!el || isCapturing) return
    setIsCapturing(true)
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = 'threadwork-preview.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setIsCapturing(false)
    }
  }

  const surprise = () => {
    setInitials(initialSuggestions[Math.floor(Math.random() * initialSuggestions.length)].toUpperCase())
    setFont(fontOptions[Math.floor(Math.random() * fontOptions.length)].value)
    setThread(Math.floor(Math.random() * threadOptions.length))
    setFabric(Math.floor(Math.random() * fabricOptions.length))
    setDensity(densityOptions[Math.floor(Math.random() * densityOptions.length)].value)
    setSize(sizeOptions[Math.floor(Math.random() * sizeOptions.length)].value)
    setDecorations([
      { id: Date.now(), type: decorOptions[Math.floor(Math.random() * decorOptions.length)].id, x: 74, y: 82 },
    ])
  }

  const requestHref = useMemo(() => {
    const lines = [
      'Custom embroidery request',
      '',
      `Marks / initials: ${initials || '—'}`,
      `Letter style: ${fontOptions.find((f) => f.value === font)?.label}`,
      `Thread: ${threadOptions[thread]?.name}`,
      `Fabric: ${fabricOptions[fabric]?.name}`,
      `Stitch density: ${densityOptions.find((d) => d.value === density)?.label}`,
      `Decorations: ${decoSummary}`,
      `Hoop size: ${sizeSpecs[size].ring.replace('″ hoop', ' inch')}`,
      `Estimated stitches: ≈ ${stitchCount.toLocaleString()}`,
    ]
    const subject = 'Custom Embroidery Request'
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  }, [initials, font, thread, fabric, density, size, stitchCount, decoSummary])

  const summaryChips = [
    initials || 'Initial',
    fontOptions.find((f) => f.value === font)?.label ?? '',
    threadOptions[thread]?.name ?? '',
    fabricOptions[fabric]?.name ?? '',
    densityOptions.find((d) => d.value === density)?.label ?? '',
    decorations.length > 0 ? `${decorations.length} decoration${decorations.length === 1 ? '' : 's'}` : null,
  ].filter(Boolean)

  return (
    <div className="rounded-sm border border-beige-deep/40 bg-ivory p-6 text-charcoal shadow-2xl shadow-black/30 md:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-terracotta">
          Design your piece
        </p>
        <button
          type="button"
          onClick={surprise}
          className="text-xs text-charcoal-soft underline-offset-4 transition-colors hover:text-terracotta hover:underline"
        >
          Surprise me
        </button>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Preview */}
        <div className="flex flex-col items-center">
          <div
            ref={previewRef}
            className="relative aspect-square w-full max-w-[280px]"
            role="img"
            aria-label={`Preview of ${initials || 'your initial'}, ${threadOptions[thread]?.name} thread on ${fabricOptions[fabric]?.name}`}
          >
            {/* Wooden hoop ring */}
            <div
              className="absolute inset-0 rounded-full border-[11px] border-[#b47a44]"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06), 0 24px 40px -20px rgba(0,0,0,0.45)' }}
            />
            {/* Fabric */}
            <div
              ref={fabricRef}
              onDragEnter={onFabricDragEnter}
              onDragOver={onFabricDragOver}
              onDragLeave={onFabricDragLeave}
              onDrop={onFabricDrop}
              className="absolute inset-[11px] overflow-hidden rounded-full transition-colors duration-500"
              style={{ backgroundColor: fabricColor }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), transparent 62%)' }}
                aria-hidden="true"
              />
              {/* Guide stitch-circle */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed transition-colors duration-500"
                style={{ borderColor: threadColor, opacity: 0.35 }}
                aria-hidden="true"
              />
              {isDragOver && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-full bg-terracotta/5 ring-2 ring-inset ring-terracotta/80"
                  aria-hidden="true"
                />
              )}
              {decorations.length === 0 && !isDragOver && (
                <div className="pointer-events-none absolute bottom-[9%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-dashed border-charcoal/20 bg-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-charcoal-soft/80">
                  Drag accents here
                </div>
              )}
              {/* Letter */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span
                  key={`${initials}-${font}-${size}`}
                  className={`${letterFont} ${letterWeight} animate-[stitch-pop_0.45s_cubic-bezier(0.22,1,0.36,1)] leading-none`}
                  style={{
                    fontSize: `${letterPx}px`,
                    color: threadColor,
                    letterSpacing: charCount <= 4 ? (font === 'modern' ? '0.04em' : '0.01em') : charCount <= 6 ? '0' : '-0.02em',
                    textShadow: '0 1px 0 rgba(0,0,0,0.18), 0 0 22px rgba(0,0,0,0.12)',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {initials || 'A'}
                </span>
              </div>
              {/* Placed decorations */}
              {decorations.map((deco) => {
                const label = decorOptions.find((o) => o.id === deco.type)?.label ?? 'decoration'
                return (
                  <div
                    key={deco.id}
                    draggable
                    onDragStart={(e) => onPlacedDragStart(e, deco)}
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    style={{ left: `${deco.x}%`, top: `${deco.y}%` }}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 ring-1 ring-black/[0.08] backdrop-blur-[2px] transition-shadow group-hover:ring-terracotta/60"
                    >
                      <DecorGlyph id={deco.type} className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDeco(deco.id)}
                      aria-label={`Remove ${label}`}
                      className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-charcoal text-[10px] leading-none text-ivory shadow opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="mt-4 rounded-full bg-sand px-4 py-1.5 text-xs text-charcoal">
            {sizeSpecs[size].ring} · ≈ {stitchCount.toLocaleString()} stitches
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-5">
          <Field label="Your initials or name">
            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={7}
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase().replace(/\s/g, ''))}
                placeholder="A"
                aria-label="Your initials or name"
                className="w-24 rounded-sm border-b-2 border-charcoal/25 bg-transparent py-1 font-serif text-2xl tracking-[0.15em] text-charcoal outline-none transition-colors focus:border-terracotta"
              />
              <span className="text-xs text-charcoal-soft">Up to 7 letters</span>
            </div>
          </Field>

          <Field label="Letter style">
            <SegmentGroup options={fontOptions} value={font} onChange={setFont} />
          </Field>

          <SwatchGroup label="Thread" options={threadOptions} value={thread} onChange={setThread} />
          <SwatchGroup label="Fabric" options={fabricOptions} value={fabric} onChange={setFabric} />

          <Field label="Stitch density">
            <SegmentGroup options={densityOptions} value={density} onChange={setDensity} />
          </Field>

          <Field label="Decorations">
            <div className="flex flex-wrap items-center gap-2">
              {decorOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  draggable
                  onDragStart={(e) => onPaletteDragStart(e, opt.id)}
                  onClick={() => addDeco(opt.id, 74, 82)}
                  title="Drag onto the hoop, or click to add"
                  className="flex items-center gap-1.5 rounded-full border border-beige-deep/60 bg-white/50 px-3 py-1.5 text-xs text-charcoal transition-all hover:border-terracotta hover:text-terracotta active:scale-95"
                >
                  <DecorGlyph id={opt.id} className="h-4 w-4" />
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-charcoal-soft">
              Drag onto the hoop to place, or click to add. Drag placed accents to reposition.
            </p>
            {decorations.length > 0 && (
              <button
                type="button"
                onClick={clearDecos}
                className="mt-2 text-xs text-charcoal-soft underline-offset-4 transition-colors hover:text-terracotta hover:underline"
              >
                Clear {decorations.length} decoration{decorations.length === 1 ? '' : 's'}
              </button>
            )}
          </Field>

          <Field label="Hoop size">
            <SegmentGroup options={sizeOptions} value={size} onChange={setSize} />
          </Field>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 border-t border-beige-deep/40 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          {summaryChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-sand px-3 py-1 text-xs text-charcoal-soft"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={requestHref} size="lg" className="sm:flex-1">
            Request this piece
          </Button>
          <Button
            type="button"
            onClick={capturePreview}
            disabled={isCapturing}
            variant="outline"
            size="lg"
            className="sm:flex-1"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            {isCapturing ? 'Capturing…' : 'Download preview'}
          </Button>
        </div>
        <p className="mt-3 max-w-xl text-center text-xs font-light leading-relaxed text-charcoal-soft sm:mx-auto">
          Opens your email with all your choices filled in — attach the downloaded preview image so we can match it exactly. No sign-up needed.
        </p>
      </div>
    </div>
  )
}