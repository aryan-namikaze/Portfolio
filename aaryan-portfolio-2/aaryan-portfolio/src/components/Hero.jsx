import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotion } from '../hooks/useMotion'
import Lines from './Lines'
import Enso from './Enso'
import { site } from '../config/site'

export default function Hero() {
  const ref = useRef(null)
  const { hero } = site

  useMotion(ref, ({ motion, fine }, q) => {
    if (!motion) return

    // ── Entrance: ink is painted in, headline letters rise, details follow. Never blocks scrolling.
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(q('.enso__a'), { attr: { 'stroke-dasharray': '0 100' } }, { attr: { 'stroke-dasharray': '92 8' }, duration: 1.7, ease: 'power2.inOut' }, 0)
      .fromTo(q('.enso__b'), { attr: { 'stroke-dasharray': '0 100' } }, { attr: { 'stroke-dasharray': '58 42' }, duration: 1.9, ease: 'power2.inOut' }, 0.15)
      .fromTo(q('.enso__c'), { attr: { 'stroke-dasharray': '0 100' } }, { attr: { 'stroke-dasharray': '30 70' }, duration: 1.6, ease: 'power2.inOut' }, 0.3)
      .from(q('.enso__moon'), { scale: 0, transformOrigin: '50% 50%', duration: 1, ease: 'expo.out' }, 0.9)
      .from(q('.hero__title .ch'), { yPercent: 115, duration: 1, stagger: 0.028 }, 0.2)
      .from(q('.hero__seal'), { scale: 0.5, autoAlpha: 0, rotate: -14, duration: 0.7, ease: 'back.out(2)' }, 1)
      .from(q('.hero__ma'), { autoAlpha: 0, y: 24, duration: 0.9 }, 0.9)
      .from(q('.hero__foot > *'), { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.12 }, 1)

    // ── Scroll: the composition drifts apart as the next section approaches.
    const scrub = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to(q('.hero__art'), { scale: 1.3, rotation: 50, yPercent: -8, ease: 'none', scrollTrigger: scrub })
    gsap.to(q('.hero__s1'), { xPercent: -7, ease: 'none', scrollTrigger: scrub })
    gsap.to(q('.hero__s2'), { xPercent: 7, ease: 'none', scrollTrigger: scrub })
    gsap.to(q('.hero__foot, .hero__ma'), { autoAlpha: 0, y: -50, ease: 'none', scrollTrigger: { ...scrub, end: '45% top' } })

    // ── Pointer: the moon and ring lean gently away from the cursor.
    if (fine) {
      const xTo = gsap.quickTo(q('.hero__tilt')[0], 'x', { duration: 1.2, ease: 'power3' })
      const yTo = gsap.quickTo(q('.hero__tilt')[0], 'y', { duration: 1.2, ease: 'power3' })
      const move = (e) => {
        xTo(-(e.clientX / window.innerWidth - 0.5) * 36)
        yTo(-(e.clientY / window.innerHeight - 0.5) * 36)
      }
      window.addEventListener('pointermove', move, { passive: true })
      return () => window.removeEventListener('pointermove', move)
    }
  })

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__enso" aria-hidden="true">
        <div className="hero__tilt">
          <div className="hero__art">
            <Enso id="hero" />
          </div>
        </div>
      </div>

      <div className="hero__ma jp-wrap" aria-hidden="true">
        <span className="jp hero__kanji" lang="ja">{hero.ma.kanji}</span>
        <span className="hero__ma-note">
          {hero.ma.reading}: {hero.ma.meaning}
        </span>
      </div>

      <h1 className="hero__title" aria-label={`${hero.first.join(' ')} ${hero.second.join(' ')}`}>
        <span className="hero__s1" aria-hidden="true">
          <Lines lines={hero.first} chars />
        </span>
        <span className="hero__s2" aria-hidden="true">
          <Lines lines={hero.second} chars />
        </span>
      </h1>

      <div className="hero__foot">
        <p className="hero__copy">{hero.copy}</p>
        <div className="hero__side">
          <span className="seal hero__seal jp" lang="ja" aria-hidden="true">
            <b>{hero.seal[0]}</b>
            <b>{hero.seal[1]}</b>
          </span>
          <p className="hero__who">
            {site.name}
            <br />
            {site.role}
          </p>
        </div>
      </div>
    </section>
  )
}
