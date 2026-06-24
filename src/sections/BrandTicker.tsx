export default function BrandTicker() {
  const brands = [
    'Safaricom',
    'Airtel',
    'Telkom',
    'Equity Bank',
    'KCB',
    'M-Pesa',
    'Co-op Bank',
    'Jumia',
    'Twiga',
    'Cellulant',
  ];

  return (
    <section className="w-full bg-mapema-bg border-t border-mapema-border overflow-hidden py-6">
      <p className="label-text text-mapema-text-muted text-center mb-4">
        Powering connectivity for
      </p>
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="label-text text-mapema-text-muted/50 mx-12 select-none"
              style={{ fontSize: '14px', letterSpacing: '0.15em' }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
