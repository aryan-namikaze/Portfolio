import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotion } from '../hooks/useMotion'
import Lines from './Lines'
import { site } from '../config/site'

export default function Capabilities() {
  const ref = useRef(null)

  useMotion(ref, ({ motion }, q) => {
    if (!motion) return
    gsap.from(q('.cap__title .line__in'), {
      yPercent: 115, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('.cap__title')[0], start: 'top 85%' },
    })
    q('.cap__row').forEach((row) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 88%' } })
      tl.from(row.querySelector('.cap__rule'), { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'power3.inOut' })
        .from(row.querySelector('.cap__name'), { yPercent: 100, duration: 0.8, ease: 'power3.out' }, 0.1)
    })
  })

  return (
    <section className="cap" ref={ref}>
      <Lines as="h2" className="cap__title" lines={site.capabilitiesTitle} />
      <ul className="cap__list">
        {site.capabilities.map((c) => (
          <li className="cap__row" key={c.title} tabIndex={0}>
            <span className="cap__rule" aria-hidden="true" />
            <div className="cap__main">
              <h3 className="cap__mask">
                <span className="cap__name">{c.title}</span>
              </h3>
              <p className="cap__text">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
      {site.tools.length > 0 && <p className="cap__tools">Tools I reach for: {site.tools.join(', ')}.</p>}
    </section>
  )
}
