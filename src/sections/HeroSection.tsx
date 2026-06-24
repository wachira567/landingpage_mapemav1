import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ValleyCanvas from '../components/ValleyCanvas';

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from('.hero-headline', { opacity: 0, y: 40, duration: 1, ease: 'power2.out' })
        .from('.hero-sub', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('.hero-trust', { opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.2');
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative w-full" style={{ height: '100vh' }}>
      <ValleyCanvas />

      {/* Bottom gradient overlay for text readability */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '40%',
          background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 100%)',
        }}
      />

      {/* Hero text overlay */}
      <div
        ref={textRef}
        className="absolute bottom-0 left-0 right-0 z-[3] flex flex-col items-center text-center"
        style={{ paddingBottom: '15vh' }}
      >
        <h1
          className="hero-headline headline-hero text-mapema-text-primary"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
        >
          Kenya's Connected Future
        </h1>

        <p className="hero-sub body-large text-mapema-text-secondary max-w-[600px] mt-6 px-6">
          Enterprise connectivity and rewards infrastructure powering businesses and homes across East Africa.
        </p>

        <div className="hero-cta flex items-center gap-4 mt-10 flex-wrap justify-center px-6">
          <a
            href="#contact"
            className="cta-text bg-mapema-gold text-[#050505] px-8 py-3.5 hover:bg-mapema-gold-hover transition-all duration-200 hover:scale-[1.02]"
          >
            Talk to Sales
          </a>
          <a
            href="#enterprise"
            className="cta-text bg-transparent border border-[rgba(255,250,240,0.3)] text-mapema-text-primary px-8 py-3.5 hover:border-mapema-gold hover:text-mapema-gold transition-all duration-200"
          >
            Explore Solutions
          </a>
        </div>

        <p className="hero-trust label-text text-mapema-text-muted mt-6">
          Trusted by 500+ enterprises across Kenya
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 animate-scroll-indicator">
        <span className="label-text text-mapema-text-muted">SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-mapema-text-muted">
          <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
