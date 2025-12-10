interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '50,000+', label: 'Active Users' },
  { value: '1M+', label: 'Listening Sessions' },
  { value: '500K+', label: 'Downloads' },
  { value: '40+', label: 'Languages Supported' },
]

export function Stats() {
  return (
    <section id="stats" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Connecting Millions to the Quran
        </h2>

        <p className="text-muted-foreground mt-2">
          Our impact across Quran Tab and Quran Station
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
