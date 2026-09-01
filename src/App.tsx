import { AuroraBackground } from './components/AuroraBackground'
import { ScrollProgress, Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { About } from './components/About'
import { WorkShowcase, Experience } from './components/WorkShowcase'
import { Skills } from './components/Skills'
import { Certifications } from './components/Certifications'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <WorkShowcase />
        <Experience />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
