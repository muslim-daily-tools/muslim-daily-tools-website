import { ToolsPreview } from './ToolsPreview'

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-6 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-tight tracking-tight">
          A World Organized Around
          <br />
          Daily Worship
        </h1>

        {/* Subtext */}
        <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mt-6 leading-relaxed">
          Muslim Daily Tools helps you keep the Qur'an close, your prayers on
          time, and remembrance in rhythm — with fast, minimalist tools that fit
          your day.
        </p>

        {/* Tool Cards */}
        <ToolsPreview />

        {/* CTA Button */}
        <div className="mt-10">
          <a
            href="#tools"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Explore Our Tools
          </a>
        </div>
      </div>
    </section>
  )
}
