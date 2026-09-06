import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
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

/* ============================ GLYPHS ============================ */

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
    const total = base * densityF * sizeF
    return Math.round(total / 10) * 10
  }, [density, size, charCount])

  const surprise = () => {
    setInitials(initialSuggestions[Math.floor(Math.random() * initialSuggestions.length)].toUpperCase())
    setFont(fontOptions[Math.floor(Math.random() * fontOptions.length)].value)
    setThread(Math.floor(Math.random() * threadOptions.length))
    setFabric(Math.floor(Math.random() * fabricOptions.length))
    setDensity(densityOptions[Math.floor(Math.random() * densityOptions.length)].value)
    setSize(sizeOptions[Math.floor(Math.random() * sizeOptions.length)].value)
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
      `Hoop size: ${sizeSpecs[size].ring.replace('″ hoop', ' inch')}`,
      `Estimated stitches: ≈ ${stitchCount.toLocaleString()}`,
    ]
    const subject = 'Custom Embroidery Request'
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  }, [initials, font, thread, fabric, density, size, stitchCount])

  const summaryChips = [
    initials || 'Initial',
    fontOptions.find((f) => f.value === font)?.label ?? '',
    threadOptions[thread]?.name ?? '',
    fabricOptions[fabric]?.name ?? '',
    densityOptions.find((d) => d.value === density)?.label ?? '',
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
              className="absolute inset-[11px] overflow-hidden rounded-full transition-colors duration-500"
              style={{ backgroundColor: fabricColor }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), transparent 62%)' }}
                aria-hidden="true"
              />
              {/* Guide stitch-circle */}
              <div
                className="absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed transition-colors duration-500"
                style={{ borderColor: threadColor, opacity: 0.35 }}
                aria-hidden="true"
              />
              {/* Letter */}
              <div className="absolute inset-0 flex items-center justify-center">
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

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={requestHref} size="lg" className="sm:flex-1">
            Request this piece
          </Button>
          <p className="text-xs font-light leading-relaxed text-charcoal-soft sm:max-w-[16rem]">
            Opens your email with all your choices filled in — no sign-up needed.
          </p>
        </div>
      </div>
    </div>
  )
}