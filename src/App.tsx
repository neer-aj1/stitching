import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { FeaturedWork } from './sections/FeaturedWork'
import { TheCraft } from './sections/TheCraft'
import { CustomWork } from './sections/CustomWork'
import { Categories } from './sections/Categories'
import { About } from './sections/About'
import { Testimonials } from './sections/Testimonials'
import { FinalCta } from './sections/FinalCta'

function App() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <TheCraft />
        <CustomWork />
        <Categories />
        <About />
        <Testimonials />
        {/* <StudioGallery /> */}
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

export default App
