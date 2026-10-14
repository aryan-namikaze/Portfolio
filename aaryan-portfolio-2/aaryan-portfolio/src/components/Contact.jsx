import { useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { useMotion } from '../hooks/useMotion'
import Lines from './Lines'
import Enso from './Enso'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { site } from '../config/site'

export default function Contact() {
  const ref = useRef(null)
  const btnRef = useRef(null)
  const [state, setState] = useState('idle') // idle | copied | failed
  const c = site.contact
  const socials = c.socials.filter((s) => s.label && s.url)

  useMotion(ref, ({ motion, fine }, q) => {
    if (!motion) return
    const scrub = { trigger: ref.current, start: 'top 75%', end: 'center center', scrub: 0.8 }
    gsap.from(q('.contact__title .line__in'), { yPercent: 115, stagger: 0.15, ease: 'none', scrollTrigger: scrub })
    gsap.from(q('.contact__art'), { rotation: -40, scale: 0.8, ease: 'none', scrollTrigger: { ...scrub, end: 'bottom bottom' } })
    gsap.from(q('.contact__actions > *'), {
      autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('.contact__actions')[0], start: 'top 90%' },
    })

    // Restrained magnetic pull on the main button (mouse only)
    if (fine && btnRef.current) {
      const el = btnRef.current
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
      const move = (e) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.25)
      }
      const leave = () => { xTo(0); yTo(0) }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    }
  })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.message)
      setState('copied')
      setTimeout(() => setState('idle'), 2800)
    } catch {
      setState('failed')
    }
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__enso" aria-hidden="true">
        <div className="contact__art">
          <Enso id="contact" />
        </div>
      </div>

      <Lines as="h2" className="contact__title" lines={c.title} chars={false} />
      <p className="contact__line">{c.line}</p>

      <div className="contact__actions">
        {c.email ? (
          <a
            ref={btnRef}
            className="btn"
            href={`mailto:${c.email}?subject=${encodeURIComponent(c.subject)}`}
          >
            Email {c.email} <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        ) : (
          <button ref={btnRef} className="btn" onClick={copy}>
            {state === 'copied' ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
            {state === 'copied' ? 'Copied' : 'Copy a message'}
          </button>
        )}
        {socials.length > 0 && (
          <ul className="contact__social">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="contact__status" role="status">
        {state === 'copied' && 'Message copied. Paste it wherever you can reach me.'}
        {state === 'failed' && `Copy it by hand: ${c.message}`}
      </p>
    </section>
  )
}
