import { About } from './components/About'
import { Certifications } from './components/Certifications'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Projects } from './components/Projects'
import { ProfileRail } from './components/ProfileRail'
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
      {/* Two-column shell: a sticky profile rail (the one portrait, always in
          view) beside the scrolling content sections. */}
      <div className="layout">
        <ProfileRail />
        <main id="main" className="content">
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Publication />
          <Certifications />
        </main>
      </div>
      <Footer />
    </>
  )
}
