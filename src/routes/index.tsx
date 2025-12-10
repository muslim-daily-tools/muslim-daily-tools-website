import { createFileRoute } from '@tanstack/react-router'

import { Hero } from '../components/Hero'
import { About } from '../components/About'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <About />
    </>
  )
}
