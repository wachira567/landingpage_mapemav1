import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cities = [
  { name: 'Nairobi', x: 52, y: 55, available: true },
  { name: 'Mombasa', x: 75, y: 80, available: true },
  { name: 'Kisumu', x: 25, y: 42, available: true },
  { name: 'Nakuru', x: 42, y: 48, available: true },
  { name: 'Eldoret', x: 35, y: 35, available: false },
  { name: 'Thika', x: 55, y: 50, available: true },
  { name: 'Malindi', x: 80, y: 72, available: false },
];

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 5], [2, 3], [3, 4], [1, 6],
];

export default function CoverageSection() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<'idle' | 'available' | 'unavailable'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.coverage-left', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, x: -50, duration: 0.8, ease: 'power2.out',
      });
      gsap.from('.coverage-right', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, x: 50, duration: 0.8, ease: 'power2.out', delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const checkAvailability = () => {
    const normalized = location.toLowerCase().trim();
    const found = cities.find(c => c.name.toLowerCase() === normalized);
    if (found && found.available) {
      setResult('available');
    } else {
      setResult('unavailable');
    }
  };

  return (
    <section
      id="coverage"
      ref={sectionRef}
      className="bg-mapema-bg-alt"
      style={{ minHeight: '80vh', padding: '128px 0' }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}
      >
        {/* Left Column */}
        <div className="coverage-left">
          <p className="label-text text-mapema-gold mb-4">COVERAGE CHECKER</p>
          <h2 className="headline-section text-mapema-text-primary mb-6">
            Connected Across Kenya
          </h2>
          <p className="body-large text-mapema-text-secondary mb-8">
            From Westlands to Mombasa, Kisumu to Nakuru — check if your business location is within our enterprise network footprint.
          </p>

          <div className="space-y-4">
            <input
              type="text"
              value={location}
              onChange={(e) => { setLocation(e.target.value); setResult('idle'); }}
              onKeyDown={(e) => e.key === 'Enter' && checkAvailability()}
              placeholder="Enter your business location..."
              className="w-full bg-[rgba(255,255,255,0.05)] border border-mapema-border text-mapema-text-primary px-5 py-4 body-text placeholder:text-mapema-text-muted focus:border-mapema-gold focus:outline-none transition-colors"
            />
            <button
              onClick={checkAvailability}
              className="cta-text bg-mapema-gold text-[#050505] px-7 py-3.5 hover:bg-mapema-gold-hover transition-all duration-200 hover:scale-[1.02]"
            >
              Check Availability
            </button>
          </div>

          {result !== 'idle' && (
            <div className="mt-6 flex items-start gap-3">
              {result === 'available' ? (
                <>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <p className="body-text text-mapema-text-secondary">
                    <strong className="text-emerald-400">Service Available</strong> — Enterprise fiber and rewards API active in your area.
                  </p>
                </>
              ) : (
                <>
                  <span className="w-3 h-3 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <p className="body-text text-mapema-text-secondary">
                    <strong className="text-amber-400">Coming Soon</strong> — Register interest and we'll notify you when we launch.
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Column — Abstract Kenya Map */}
        <div className="coverage-right relative flex items-center justify-center">
          <div className="relative w-full" style={{ maxWidth: '500px', aspectRatio: '1/1.2' }}>
            {/* Radial glow from Nairobi */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '60%',
                height: '50%',
                left: '35%',
                top: '35%',
                background: 'radial-gradient(circle, rgba(237,204,158,0.08) 0%, transparent 70%)',
              }}
            />

            {/* SVG Map */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Kenya outline */}
              <path
                d="M20 20 L25 15 L35 12 L50 10 L65 15 L78 22 L85 30 L88 40 L85 55 L80 70 L75 82 L68 88 L55 90 L42 88 L30 82 L22 70 L18 55 L15 40 Z"
                fill="rgba(255,250,240,0.04)"
                stroke="rgba(255,250,240,0.08)"
                strokeWidth="0.5"
              />

              {/* Connection lines */}
              {connections.map(([from, to], i) => (
                <line
                  key={i}
                  x1={cities[from].x}
                  y1={cities[from].y}
                  x2={cities[to].x}
                  y2={cities[to].y}
                  stroke="rgba(237,204,158,0.12)"
                  strokeWidth="0.3"
                  strokeDasharray="2 2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="8"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </line>
              ))}

              {/* City dots */}
              {cities.map((city, i) => (
                <g key={i}>
                  {/* Glow */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="3"
                    fill={city.available ? 'rgba(237,204,158,0.15)' : 'rgba(107,96,85,0.1)'}
                    className={city.available ? 'animate-pulse-dot' : ''}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                  {/* Core dot */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="1.2"
                    fill={city.available ? '#EDCC9E' : '#6B6055'}
                  />
                  {/* Label */}
                  <text
                    x={city.x + 2.5}
                    y={city.y + 0.5}
                    fill={city.available ? '#A09486' : '#6B6055'}
                    fontSize="3"
                    fontFamily="Inter, sans-serif"
                  >
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
