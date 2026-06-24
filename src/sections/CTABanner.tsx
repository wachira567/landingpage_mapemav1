import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-mapema-bg-alt"
      style={{ padding: '128px 0' }}
    >
      <div
        className="cta-content flex flex-col items-center text-center"
        style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}
      >
        {/* Decorative line */}
        <div className="w-20 h-px bg-mapema-gold mb-10" />

        <h2 className="headline-section text-mapema-text-primary">
          Ready to Connect Your Business?
        </h2>

        <p className="body-large text-mapema-text-secondary mt-8">
          Join 500+ enterprises across Kenya that trust Mapema for their connectivity, rewards, and digital infrastructure needs.
        </p>

        <a
          href="#"
          className="cta-text bg-mapema-gold text-[#050505] px-10 py-4 mt-10 hover:bg-mapema-gold-hover transition-all duration-200 hover:scale-[1.02]"
        >
          Schedule a Consultation
        </a>

        <p className="body-text text-mapema-text-muted mt-6">
          Or call us directly:{' '}
          <a href="tel:+254724151515" className="text-mapema-text-secondary hover:text-mapema-gold transition-colors">
            +254 724 151 515
          </a>
        </p>
      </div>
    </section>
  );
}
