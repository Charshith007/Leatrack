const PRODUCT = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#", label: "Integrations" },
];
const COMPANY = [
  { href: "#about", label: "About" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Contact" },
];
const RESOURCES = [
  { href: "#", label: "Help Center" },
  { href: "#", label: "API Docs" },
  { href: "#", label: "Guides" },
  { href: "#", label: "Status" },
];
const LEGAL = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Security" },
  { href: "#", label: "Cookies" },
];

function FootCol({ title, links }) {
  return (
    <div className="foot-col">
      <h4>{title}</h4>
      {links.map((l) => (
        <a key={l.label} href={l.href}>{l.label}</a>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="logo" href="#top">
              <span className="mark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
              </span>
              Lea Track
            </a>
            <p>Smart Lead Tracking — turn every lead into revenue.</p>
          </div>
          <FootCol title="Product" links={PRODUCT} />
          <FootCol title="Company" links={COMPANY} />
          <FootCol title="Resources" links={RESOURCES} />
          <FootCol title="Legal" links={LEGAL} />
        </div>
        <div className="foot-bottom">
          <span>© 2026 Lea Track. Created by Shruthi Ravi Kumar.</span>
          <span>Smart Lead Tracking</span>
        </div>
      </div>
    </footer>
  );
}
