import { useEffect } from 'react'
import { ScrollTrigger } from './lib/gsap'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Work from './components/Work'
import Playground from './components/Playground'
import About from './components/About'
import Capabilities from './components/Capabilities'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Re-measure every trigger once layout, fonts and images have settled.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(() => requestAnimationFrame(refresh))
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <Cursor />
      <main id="main">
        <Hero />
        <Manifesto />
        <Work />
        <Playground />
        <About />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
