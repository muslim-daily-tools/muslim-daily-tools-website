import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Tools } from '../components/Tools'
import { Testimonials } from '../components/Testimonials'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Tools />
      <Testimonials />
    </>
  )
}
