import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Purchase',
    description: 'Buy airtime or data through the Mapema platform using M-Pesa. Fast, secure, instant delivery.',
  },
  {
    number: '02',
    title: 'Earn Cashback',
    description: 'Get up to 4% instant cashback credited to your rewards wallet on every transaction. No waiting, no minimums.',
  },
  {
    number: '03',
    title: 'Redeem',
    description: 'Redeem rewards for data bundles, airtime top-ups, or partner services including insurance and utility payments.',
  },
];

export default function RewardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rewards-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 50, duration: 0.8, ease: 'power2.out',
      });
      gsap.from('.rewards-step', {
        scrollTrigger: { trigger: '.rewards-steps', start: 'top 85%' },
        opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: 'power2.out',
      });
      gsap.from('.rewards-phone', {
        scrollTrigger: { trigger: '.rewards-phone', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });
      gsap.from('.rewards-cta', {
        scrollTrigger: { trigger: '.rewards-cta', start: 'top 90%' },
        opacity: 0, y: 30, duration: 0.6, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rewards"
      ref={sectionRef}
      className="bg-mapema-bg"
      style={{ padding: '128px 0 96px' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div className="rewards-header text-center mb-16">
          <p className="label-text text-mapema-gold mb-4">REWARDS PLATFORM</p>
          <h2 className="headline-section text-mapema-text-primary mb-6">Earn While You Connect</h2>
          <p className="body-large text-mapema-text-secondary max-w-[700px] mx-auto">
            The Mapema app transforms everyday airtime and data purchases into rewarding experiences. Every transaction earns instant cashback redeemable across 100+ partner services.
          </p>
        </div>

        {/* Steps + Phone Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Steps */}
          <div className="rewards-steps lg:col-span-7 space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="rewards-step flex gap-6 items-start">
                <span
                  className="font-display text-[48px] leading-none text-transparent flex-shrink-0"
                  style={{
                    WebkitTextStroke: '1px #EDCC9E',
                  }}
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="headline-card text-mapema-text-primary mb-3">{step.title}</h3>
                  <p className="body-text text-mapema-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Phone Mockup */}
          <div className="rewards-phone lg:col-span-5 flex justify-center">
            <div className="relative">
              <img
                src="/images/mapema-app-mockup.jpg"
                alt="Mapema Rewards App"
                className="w-full max-w-[320px] rounded-lg"
              />
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  boxShadow: '0 0 80px rgba(237,204,158,0.1), 0 20px 60px rgba(0,0,0,0.5)',
                }}
              />
            </div>
          </div>
        </div>

        {/* CTA Row */}
        <div className="rewards-cta flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="cta-text bg-mapema-gold text-[#050505] px-8 py-3.5 hover:bg-mapema-gold-hover transition-all duration-200 hover:scale-[1.02]"
            >
              Download the App
            </a>
            <a
              href="#contact"
              className="cta-text bg-transparent border border-[rgba(255,250,240,0.3)] text-mapema-text-primary px-8 py-3.5 hover:border-mapema-gold hover:text-mapema-gold transition-all duration-200"
            >
              Request Business Demo
            </a>
          </div>
          <p className="label-text text-mapema-text-muted mt-2 text-center">
            Consumer app available on iOS and Android. Business integrations via API.
          </p>
        </div>
      </div>
    </section>
  );
}
