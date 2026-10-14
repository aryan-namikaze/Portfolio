import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotion } from '../hooks/useMotion'
import Lines from './Lines'
import { site } from '../config/site'

export default function About() {
  const ref = useRef(null)
  const { about } = site

  useMotion(ref, ({ motion, desktop }, q) => {
    if (!motion) return
    const trig = { trigger: ref.current, start: 'top 70%' }
    gsap.from(q('.about__title .line__in'), { yPercent: 115, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: trig })
    gsap.fromTo(q('.about__frame'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut', scrollTrigger: trig })
    gsap.from(q('.about__copy p'), { autoAlpha: 0, y: 28, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: q('.about__copy')[0], start: 'top 80%' } })
    if (desktop) {
      gsap.fromTo(q('.about__art'), { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }
  })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__visual">
        <div className="about__frame">
          {about.image ? (
            <img className="about__art about__img" src={about.image} alt={about.imageAlt} decoding="async" />
          ) : (
            <svg className="about__art" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <circle cx="270" cy="150" r="58" fill="#f5f3ee" />
              <g fill="none" stroke="#9665ff" strokeWidth="2.5" strokeLinecap="round">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <path key={i} d={`M-20 ${300 + i * 26} Q 100 ${260 + i * 26} 200 ${300 + i * 26} T 420 ${300 + i * 26}`} strokeOpacity={1 - i * 0.12} />
                ))}
              </g>
            </svg>
          )}
        </div>
        <p className="about__vertical jp-wrap" aria-hidden="true">
          <span className="jp" lang="ja">{about.vertical.text}</span>
          <small>{about.vertical.note}</small>
        </p>
      </div>

      <div className="about__body">
        <Lines as="h2" className="about__title" lines={about.title} />
        <div className="about__copy">
          {about.paragraphs.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
