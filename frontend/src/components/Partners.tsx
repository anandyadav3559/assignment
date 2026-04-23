

export function Partners() {
  // Empty cards placeholders
  const partners = Array(10).fill(null);

  return (
    <section className="py-12 bg-background border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 text-center">
        <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
          Trusted by the world's most innovative devtools
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {partners.map((_, i) => (
            <div
              key={i}
              className="mx-4 w-48 h-24 rounded-2xl border border-border bg-card/50 flex items-center justify-center shadow-lg shadow-black/5"
            >
              <div className="w-12 h-4 bg-muted rounded-full opacity-20" />
            </div>
          ))}
        </div>

        <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
          {partners.map((_, i) => (
            <div
              key={i + 10}
              className="mx-4 w-48 h-24 rounded-2xl border border-border bg-card/50 flex items-center justify-center shadow-lg shadow-black/5"
            >
              <div className="w-12 h-4 bg-muted rounded-full opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
