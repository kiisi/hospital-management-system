import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/home/Hero'
import { Services } from '../components/home/Services'
import { AccessToCare } from '../components/home/AccessToCare'
import { WhoBenefits } from '../components/home/WhoBenefits'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <AccessToCare />
        <WhoBenefits />
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
