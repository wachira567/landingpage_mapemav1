import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  cta: string;
  image: string;
  index: number;
}

function ServiceCard({ title, description, features, cta, image }: ServiceCardProps) {
  return (
    <div
      className="enterprise-card group bg-mapema-bg-alt border border-mapema-border p-8 transition-all duration-300 hover:border-mapema-border-accent hover:bg-[rgba(237,204,158,0.03)] hover:-translate-y-1"
    >
      <div className="w-full h-48 overflow-hidden mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <h3 className="headline-card text-mapema-text-primary mb-4">{title}</h3>
      <p className="body-text text-mapema-text-secondary mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-mapema-gold mt-2 flex-shrink-0" />
            <span className="body-text text-mapema-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 cta-text text-mapema-gold hover:text-mapema-gold-hover transition-colors group/link"
      >
        {cta}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover/link:translate-x-1 transition-transform">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function EnterpriseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.enterprise-header', {
        scrollTrigger: {
          trigger: '.enterprise-header',
          start: 'top 85%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Cards staggered reveal
      gsap.from('.enterprise-card', {
        scrollTrigger: {
          trigger: '.enterprise-grid',
          start: 'top 80%',
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: 'Dedicated Fiber & Satellite',
      description: 'Private fiber links, satellite backup, and SD-WAN solutions for businesses that cannot afford downtime. Guaranteed SLAs with 99.9% uptime.',
      features: ['Unlimited bandwidth options', 'Multi-location WAN management', '24/7 enterprise support desk'],
      cta: 'Get a Quote',
      image: '/images/enterprise-fiber.jpg',
    },
    {
      title: 'Rewards & Cashback Platform',
      description: 'White-label rewards infrastructure powering airtime cashback, loyalty programs, and employee incentive systems. KES 2M+ in rewards already distributed.',
      features: ['Up to 4% instant cashback', '100+ partner service integrations', 'Real-time analytics dashboard'],
      cta: 'View API Docs',
      image: '/images/rewards-api-dashboard.jpg',
    },
    {
      title: 'Bulk Distribution Engine',
      description: 'Enterprise-grade airtime and data distribution at scale. Automate disbursements to thousands of employees or customers instantly via M-Pesa integration.',
      features: ['Instant M-Pesa settlement', 'Bulk SMS + airtime bundles', 'Custom tariff negotiations'],
      cta: 'Talk to Sales',
      image: '/images/bulk-airtime-engine.jpg',
    },
    {
      title: 'Managed Network & Security',
      description: 'End-to-end IT infrastructure management for mid-market and enterprise. From network design to cybersecurity — we keep your operations running.',
      features: ['Network monitoring & NOC', 'Firewall & endpoint security', 'Cloud migration consulting'],
      cta: 'Schedule Assessment',
      image: '/images/managed-security.jpg',
    },
  ];

  return (
    <section
      id="enterprise"
      ref={sectionRef}
      className="bg-mapema-bg"
      style={{ padding: '128px 0 96px' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <div className="enterprise-header text-center mb-16">
          <p className="label-text text-mapema-gold mb-4">ENTERPRISE SOLUTIONS</p>
          <h2 className="headline-section text-mapema-text-primary max-w-[800px] mx-auto">
            Infrastructure That Scales With Your Ambition
          </h2>
          <p className="body-large text-mapema-text-secondary max-w-[700px] mx-auto mt-8">
            From fiber backbone to employee reward programs — Mapema builds the digital foundation that keeps Kenya's businesses connected, motivated, and growing.
          </p>
        </div>

        <div className="enterprise-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
