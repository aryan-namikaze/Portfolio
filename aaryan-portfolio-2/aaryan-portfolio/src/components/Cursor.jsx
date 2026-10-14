import { useEffect, useRef } from 'react'
import { gsap, MQ } from '../lib/gsap'

// A quiet violet ring that trails the pointer. Only on mouse/trackpad, never with reduced motion.
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia(MQ.fine).matches || !window.matchMedia(MQ.motion).matches) return
    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })
    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      el.classList.add('is-on')
    }
    const over = (e) => el.classList.toggle('is-big', !!e.target.closest?.('a, button, [data-cursor]'))
    const leave = () => el.classList.remove('is-on')
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <i />
    </div>
  )
}
