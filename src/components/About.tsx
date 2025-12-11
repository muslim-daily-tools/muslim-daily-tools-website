export function About() {
  return (
    <section id="about" className="bg-card py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Who Are We
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mt-6">
          Muslim Daily Tools is a purpose-driven initiative dedicated to helping
          Muslims weave worship into everyday life. We build lightweight browser
          extensions and micro-apps that are respectful, private, and
          beautifully simple. Whether you're reading, listening, or scheduling
          your day, our aim is to keep guidance near and distractions away.
        </p>

        <p className="text-lg text-muted-foreground leading-relaxed mt-6">
          Rooted in authenticity and shaped by modern design, MDT bridges
          intention with technology to inspire consistency. We believe that{' '}
          <em className="text-foreground/80">
            when faith meets flow, small habits compound into a life of
            remembrance
          </em>
          .
        </p>
      </div>
    </section>
  )
}
