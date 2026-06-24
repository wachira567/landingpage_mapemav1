import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '50K+', label: 'Active Members' },
  { number: 'KES 2M+', label: 'Rewards Distributed' },
  { number: '500+', label: 'Enterprise Clients' },
  { number: '99.9%', label: 'Network Uptime' },
];

export default function StatsBand() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="w-full bg-mapema-bg border-y border-mapema-border"
      style={{ padding: '64px 0' }}
    >
      <div
        className="flex flex-wrap justify-center items-center gap-8 md:gap-0"
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}
      >
        {stats.map((stat, i) => (
          <div key={i} className="stat-item flex items-center">
            <div className="text-center px-8 md:px-12">
              <p className="headline-section text-mapema-text-primary">{stat.number}</p>
              <p className="label-text text-mapema-text-muted mt-2">{stat.label}</p>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden md:block w-px h-[60px] bg-mapema-border" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
