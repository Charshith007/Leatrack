import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
  ];

  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")} id="nav">
        <div className="wrap nav-inner">
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
          <nav className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <div className="nav-cta">
            <a className="ghost-link" href="#">Log In</a>
            <a className="btn btn-green btn-sm mobile-show" href="#pricing">Get Started</a>
            <button className="burger" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#14181a" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className={"mobile-menu" + (menuOpen ? " open" : "")} id="mobileMenu">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href="#" onClick={() => setMenuOpen(false)}>Log In</a>
        <a className="btn btn-green" href="#pricing" onClick={() => setMenuOpen(false)}>Get Started</a>
      </div>
    </>
  );
}
