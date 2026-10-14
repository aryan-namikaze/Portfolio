import { useLayoutEffect } from 'react'
import { gsap, MQ } from '../lib/gsap'

/**
 * Runs `setup` inside a GSAP matchMedia + context scoped to `scopeRef`.
 * Everything created inside is cleaned up automatically on unmount / breakpoint change.
 * `setup` receives { motion, desktop, fine } booleans and a scoped selector `q`,
 * and may return a cleanup function.
 */
export function useMotion(scopeRef, setup) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      { motion: MQ.motion, desktop: MQ.desktop, fine: MQ.fine },
      (ctx) => setup(ctx.conditions, gsap.utils.selector(scopeRef)),
      scopeRef.current
    )
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
