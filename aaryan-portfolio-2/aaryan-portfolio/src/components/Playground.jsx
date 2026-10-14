import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotion } from '../hooks/useMotion'
import Lines from './Lines'
import { site } from '../config/site'

/* ── Toy 1: ink that fades. Strokes are stored and redrawn, so nothing ghosts and the loop only runs while ink is visible. */
function InkPad({ hint, label }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const LIFE = 1800
    let w = 0, h = 0, raf = 0, last = null
    let segs = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const frame = (now) => {
      ctx.clearRect(0, 0, w, h)
      segs = segs.filter((s) => now - s.t < LIFE)
      ctx.lineCap = 'round'
      for (const s of segs) {
        const k = 1 - (now - s.t) / LIFE
        ctx.strokeStyle = `rgba(150,101,255,${k})`
        ctx.lineWidth = s.w * (0.4 + 0.6 * k)
        ctx.beginPath()
        ctx.moveTo(s.x1, s.y1)
        ctx.lineTo(s.x2, s.y2)
        ctx.stroke()
      }
      raf = segs.length ? requestAnimationFrame(frame) : 0
    }

    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (last) {
        const d = Math.hypot(x - last.x, y - last.y)
        segs.push({ x1: last.x, y1: last.y, x2: x, y2: y, w: Math.max(2, 20 - d * 0.5), t: performance.now() })
        if (segs.length > 600) segs.shift()
        if (!raf) raf = requestAnimationFrame(frame)
      }
      last = { x, y }
    }
    const end = () => { last = null }

    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', end)
    canvas.addEventListener('pointerup', end)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', end)
      canvas.removeEventListener('pointerup', end)
    }
  }, [])

  return (
    <figure className="toy toy--ink">
      <canvas ref={canvasRef} aria-hidden="true" />
      <figcaption>
        <b>{label}</b>
        <span>{hint}</span>
      </figcaption>
    </figure>
  )
}

/* ── Toy 2: letters gain weight as the pointer gets close. Updates are batched into one animation frame. */
function WeightToy({ word, hint, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const chars = [...el.querySelectorAll('.wt__c')]
    let queued = false, pos = null

    const paint = () => {
      queued = false
      chars.forEach((c) => {
        let t = 0
        if (pos) {
          const r = c.getBoundingClientRect()
          t = Math.max(0, 1 - Math.hypot(pos.x - (r.left + r.width / 2), pos.y - (r.top + r.height / 2)) / 200)
        }
        c.style.fontVariationSettings = `'wght' ${Math.round(300 + t * 400)}`
        c.style.color = `color-mix(in srgb, #9665ff ${Math.round(t * 100)}%, #f5f3ee)`
      })
    }
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(paint) } }
    const move = (e) => { pos = { x: e.clientX, y: e.clientY }; queue() }
    const leave = () => { pos = null; queue() }

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <figure className="toy toy--type">
      <div className="wt" ref={ref} role="img" aria-label={word}>
        {word.split('').map((c, i) => (
          <span className="wt__c" key={i} aria-hidden="true">{c}</span>
        ))}
      </div>
      <figcaption>
        <b>{label}</b>
        <span>{hint}</span>
      </figcaption>
    </figure>
  )
}

export default function Playground() {
  const ref = useRef(null)
  const { playground: p } = site

  useMotion(ref, ({ motion }, q) => {
    if (!motion) return
    const head = q('.pg__title')[0]
    gsap.from(q('.pg__title .line__in'), {
      yPercent: 115, duration: 1, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: head, start: 'top 80%' },
    })
    gsap.from(q('.toy'), {
      clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, stagger: 0.15, ease: 'power4.inOut',
      scrollTrigger: { trigger: q('.pg__grid')[0], start: 'top 80%' },
    })
  })

  return (
    <section className="pg" id="playground" ref={ref}>
      <Lines as="h2" className="pg__title" lines={p.title} />
      <div className="pg__grid">
        <InkPad label={p.ink.label} hint={p.ink.hint} />
        <WeightToy word={p.type.word} label={p.type.label} hint={p.type.hint} />
      </div>
    </section>
  )
}
