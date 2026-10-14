import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import { site } from '../config/site'

const WATCH = ['top', 'manifesto', ...site.nav.map((n) => n.id)]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Highlight the link of the section currently in view (state only changes when a section changes).
  useEffect(() => {
    const triggers = WATCH.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setActive(site.nav.some((n) => n.id === id) ? id : ''),
      })
    })
    return () => triggers.forEach((t) => t && t.kill())
  }, [])

  // Mobile menu: lock scroll, close on Escape.
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [open])

  return (
    <header className="nav">
      <a className="nav__logo" href="#top" aria-label={`${site.name}, back to top`} onClick={() => setOpen(false)}>
        A<span>R</span>
      </a>
      <p className="nav__status">
        <i aria-hidden="true" />
        {site.status}
      </p>
      <nav className="nav__links" aria-label="Main">
        {site.nav.map((n) => (
          <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined}>
            {n.label}
          </a>
        ))}
      </nav>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      <div className="menu" id="menu" data-open={open} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {site.nav.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              style={{ '--i': i }}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <p className="nav__status">
          <i aria-hidden="true" />
          {site.status}
        </p>
      </div>
    </header>
  )
}
