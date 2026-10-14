import { site } from '../config/site'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {site.name}</p>
      <p>Designed and built by hand, with help.</p>
      <a href="#top">Back to top</a>
    </footer>
  )
}
