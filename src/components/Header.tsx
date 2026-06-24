import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Enterprise', href: '#enterprise' },
    { label: 'Home Solutions', href: '#rewards' },
    { label: 'Rewards', href: '#rewards' },
    { label: 'About', href: '#stats' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(5, 5, 5, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,250,240,0.06)' : '1px solid transparent',
      }}
    >
      <div
        className="flex items-center justify-between h-[72px]"
        style={{ padding: '0 clamp(24px, 5vw, 80px)' }}
      >
        {/* Logo */}
        <a href="#" className="label-text text-mapema-text-primary tracking-[0.15em]">
          MAPEMA
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-text text-mapema-text-secondary hover:text-mapema-text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="nav-text text-mapema-text-secondary hover:text-mapema-text-primary transition-colors duration-200"
          >
            Client Login
          </a>
          <a
            href="#contact"
            className="cta-text bg-mapema-gold text-[#050505] px-6 py-3 hover:bg-mapema-gold-hover transition-all duration-200 hover:scale-[1.02]"
          >
            Talk to Sales
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-mapema-text-primary transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-6 h-px bg-mapema-text-primary transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-mapema-text-primary transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-[72px] left-0 right-0 py-8 px-6 flex flex-col gap-6"
          style={{ background: 'rgba(5, 5, 5, 0.98)', backdropFilter: 'blur(16px)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-text text-mapema-text-secondary hover:text-mapema-text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="cta-text bg-mapema-gold text-[#050505] px-6 py-3 text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Talk to Sales
          </a>
        </div>
      )}
    </header>
  );
}
