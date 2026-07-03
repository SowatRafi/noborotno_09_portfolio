import { About } from './components/About'
import { BentoHero } from './components/BentoHero'
import { Certifications } from './components/Certifications'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
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
        <BentoHero />
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
