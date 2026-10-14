import { useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useMotion } from '../hooks/useMotion'
import Lines from './Lines'
import { site } from '../config/site'

export default function Manifesto() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const items = site.manifesto

  useMotion(ref, ({ motion, desktop }, q) => {
    if (!motion) return // reduced motion: statements simply stack and stay visible

    const section = ref.current
    section.classList.add('is-pinned') // switches the CSS from "stacked" to "one statement at a time"

    const stmts = q('.stmt')
    const D = 3 // timeline units per statement
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: stageRef.current,
        start: 'top top',
        end: `+=${items.length * (desktop ? 90 : 70)}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    })

    stmts.forEach((stmt, i) => {
      const inner = stmt.querySelectorAll('.line__in')
      const jp = stmt.querySelector('.stmt__jp')
      if (i > 0) {
        gsap.set(jp, { autoAlpha: 0 })
        tl.fromTo(inner, { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.12 }, i * D)
        tl.to(jp, { autoAlpha: 1, duration: 0.8 }, i * D + 0.4)
      }
      if (i < stmts.length - 1) {
        tl.to(jp, { autoAlpha: 0, duration: 0.5 }, i * D + 1.9)
        tl.to(inner, { yPercent: -115, duration: 1, stagger: 0.08 }, i * D + 2)
      }
    })

    const total = tl.duration()
    tl.to(q('.manifesto__moon'), { scale: 1.7, rotation: 120, ease: 'none', duration: total }, 0)
    tl.to(q('.manifesto__prog i'), { scaleY: 1, ease: 'none', duration: total }, 0)
  })

  return (
    <section className="manifesto" id="manifesto" ref={ref}>
      <div className="manifesto__stage" ref={stageRef}>
        <div className="manifesto__bg" aria-hidden="true">
          <div className="manifesto__moon" />
        </div>
        <div className="manifesto__prog" aria-hidden="true">
          <i />
        </div>
        {items.map((s, i) => (
          <div className="stmt" key={i}>
            <Lines as="h2" className="stmt__text" lines={s.lines} />
            <p className="stmt__jp" aria-hidden="true">
              <span className="jp" lang="ja">{s.jp}</span>
              <small>{s.note}</small>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
