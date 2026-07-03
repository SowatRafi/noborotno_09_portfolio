import { About } from './components/About'
import { Certifications } from './components/Certifications'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Publication } from './components/Publication'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <>
      {/* Keyboard users can bypass the nav — required for WCAG and cheap to provide. */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publication />
        <Certifications />
      </main>
      <Footer />
    </>
  )
}
