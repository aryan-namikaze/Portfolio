import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useMotion } from '../hooks/useMotion'
import Lines from './Lines'
import ProjectVisual from './ProjectVisual'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/site'

export default function Work() {
  const ref = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const { projectsIntro, projects } = site

  useMotion(ref, ({ motion, desktop, fine }, q) => {
    // Heading reveal
    if (motion) {
      gsap.from(q('.work__head .line__in'), {
        yPercent: 115, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: q('.work__head')[0], start: 'top 80%' },
      })
      gsap.from(q('.work__head p'), {
        autoAlpha: 0, y: 20, duration: 0.9, delay: 0.2,
        scrollTrigger: { trigger: q('.work__head')[0], start: 'top 80%' },
      })
    }

    const panels = q('.proj')
    const open = 'inset(0% 0% 0% 0%)'

    // ── Desktop: a pinned horizontal run through the projects
    if (motion && desktop) {
      const track = trackRef.current
      const dist = () => track.scrollWidth - window.innerWidth
      const run = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      panels.forEach((panel, i) => {
        const frame = panel.querySelector('.proj__frame')
        const media = panel.querySelector('.proj__media')
        const bg = panel.querySelector('.proj__bg')
        const info = panel.querySelectorAll('.proj__info > *')
        const travel = { trigger: panel, containerAnimation: run, start: 'left right', end: 'right left', scrub: true }

        // layered parallax: giant title and artwork move at different speeds
        gsap.fromTo(bg, { xPercent: 14 }, { xPercent: -14, ease: 'none', scrollTrigger: travel })
        gsap.fromTo(media, { xPercent: 9 }, { xPercent: -9, ease: 'none', scrollTrigger: travel })

        // masked reveal of the artwork + staggered text
        const reveal = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
          .fromTo(frame, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: open, duration: 1.1, ease: 'power4.inOut' })
          .to(info, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.35)

        gsap.set(frame, { clipPath: 'inset(0% 100% 0% 0%)' })
        gsap.set(info, { autoAlpha: 0, y: 24 })
        ScrollTrigger.create(
          i === 0
            ? { trigger: pinRef.current, start: 'top 70%', once: true, onEnter: () => reveal.play() }
            : { trigger: panel, containerAnimation: run, start: 'left 75%', once: true, onEnter: () => reveal.play() }
        )
      })
    }

    // ── Mobile / tablet: vertical stack, each project wipes in
    if (motion && !desktop) {
      panels.forEach((panel) => {
        const frame = panel.querySelector('.proj__frame')
        const info = panel.querySelectorAll('.proj__info > *')
        gsap.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, {
          clipPath: open, duration: 1.1, ease: 'power4.inOut',
          scrollTrigger: { trigger: panel, start: 'top 80%', once: true },
        })
        gsap.from(info, {
          autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 60%', once: true },
        })
      })
    }

    // ── Pointer tilt on artwork (mouse only)
    if (motion && fine) {
      const cleanups = panels.map((panel) => {
        const media = panel.querySelector('.proj__media')
        const rx = gsap.quickTo(media, 'rotationX', { duration: 0.6, ease: 'power3' })
        const ry = gsap.quickTo(media, 'rotationY', { duration: 0.6, ease: 'power3' })
        const move = (e) => {
          const r = panel.getBoundingClientRect()
          ry(((e.clientX - r.left) / r.width - 0.5) * 5)
          rx(-((e.clientY - r.top) / r.height - 0.5) * 5)
        }
        const leave = () => { rx(0); ry(0) }
        panel.addEventListener('pointermove', move)
        panel.addEventListener('pointerleave', leave)
        return () => {
          panel.removeEventListener('pointermove', move)
          panel.removeEventListener('pointerleave', leave)
        }
      })
      return () => cleanups.forEach((c) => c())
    }
  })

  return (
    <section className="work" id="work" ref={ref}>
      <header className="work__head">
        <Lines as="h2" className="work__title" lines={[projectsIntro.title]} />
        <p>{projectsIntro.text}</p>
      </header>

      <div className="work__pin" ref={pinRef}>
        <div className="work__track" ref={trackRef}>
          {projects.map((p) => (
            <article className={`proj proj--${p.layout}`} key={p.id} data-cursor>
              <div className="proj__bg" aria-hidden="true">{p.title}</div>
              <div className="proj__frame">
                <ProjectVisual project={p} />
              </div>
              <div className="proj__info">
                <p className="proj__cat">{p.category}</p>
                <h3 className="proj__title">{p.title}</h3>
                <p className="proj__sub">{p.subtitle}</p>
                <p className="proj__desc">{p.description}</p>
                <ul className="proj__tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {p.href && (
                  <a className="proj__link" href={p.href} target="_blank" rel="noreferrer">
                    View case study <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
