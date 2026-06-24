export default function Footer() {
  const solutions = [
    'Enterprise Fiber',
    'Rewards API',
    'Bulk Airtime',
    'Managed IT',
    'Coverage Map',
  ];

  const company = [
    'About Us',
    'Careers',
    'Press Kit',
    'Blog',
    'Contact',
  ];

  return (
    <footer className="w-full bg-mapema-bg border-t border-mapema-border">
      <div
        style={{ maxWidth: '1400px', margin: '0 auto', padding: '96px clamp(24px, 5vw, 80px) 64px' }}
      >
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <p className="label-text text-mapema-text-primary tracking-[0.15em]">MAPEMA</p>
            <p className="label-text text-mapema-text-muted mt-1">151515 Ltd</p>
            <p className="body-text text-mapema-text-secondary mt-4 max-w-[280px]">
              Enterprise connectivity and fintech rewards infrastructure for Kenya.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <p className="label-text text-mapema-text-muted mb-4">SOLUTIONS</p>
            <ul className="space-y-3">
              {solutions.map((link) => (
                <li key={link}>
                  <a
                    href="#enterprise"
                    className="body-text text-mapema-text-secondary hover:text-mapema-text-primary transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="label-text text-mapema-text-muted mb-4">COMPANY</p>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="body-text text-mapema-text-secondary hover:text-mapema-text-primary transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label-text text-mapema-text-muted mb-4">GET IN TOUCH</p>
            <div className="space-y-3">
              <p className="body-text text-mapema-text-secondary">
                <span className="inline-block w-5">📍</span>
                Westlands, Nairobi, Kenya
              </p>
              <p className="body-text text-mapema-text-secondary">
                <span className="inline-block w-5">📞</span>
                <a href="tel:+254724151515" className="hover:text-mapema-gold transition-colors">
                  +254 724 151 515
                </a>
              </p>
              <p className="body-text">
                <span className="inline-block w-5">✉️</span>
                <a href="mailto:help@mapema.co.ke" className="text-mapema-gold hover:text-mapema-gold-hover transition-colors">
                  help@mapema.co.ke
                </a>
              </p>
              <p className="label-text text-mapema-text-muted mt-4">
                <span className="inline-block w-5">🕒</span>
                24/7 Customer Support
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-16 pt-8 border-t border-mapema-border gap-4">
          <p className="label-text text-mapema-text-muted">
            © 2025 Mapema 151515 Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 label-text text-mapema-text-muted">
            <a href="#" className="hover:text-mapema-text-secondary transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-mapema-text-secondary transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:text-mapema-text-secondary transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
