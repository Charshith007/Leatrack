import { Reveal } from "./Reveal.jsx";
import { Frame } from "./Frame.jsx";

const PROPERTIES = [
  { name: "Maple Grove Estates", value: 75, color: "#2d6a4f" },
  { name: "Harbor View Condos", value: 55, color: "#40916c" },
  { name: "Cedar Ridge Townhomes", value: 45, color: "#74c69d" },
  { name: "Sunset Bay Villas", value: 35, color: "#95d5b2" },
  { name: "Downtown Lofts 360", value: 25, color: "#b7e4c7" },
];

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <Reveal initiallyIn>
          <span className="pill-badge"><span className="dot" />Contact → Enrich → Convert</span>
          <h1>Turn Every Lead<br />Into <span className="accent">Revenue.</span></h1>
          <p className="sub">Lea Track is your all-in-one smart lead management system — built for real estate teams who refuse to let great leads slip away.</p>
          <div className="hero-ctas">
            <a className="btn btn-green" href="#pricing">Start Free Trial</a>
            <a className="btn btn-ghost" href="#how">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              Watch Demo
            </a>
          </div>
        </Reveal>

        <Reveal className="hero-mock" delay=".1s" initiallyIn>
          <Frame url="app.leatrack.io/dashboard" dark>
            <div className="mk-head">
              <span className="mk-title">Dashboard</span>
              <span className="mk-chip">Showing 250 Leads</span>
            </div>
            <div className="mk-stats">
              <div className="mk-stat"><div className="l">In Contact</div><div className="v tnum">128</div></div>
              <div className="mk-stat"><div className="l">In Enrich</div><div className="v tnum">79</div></div>
              <div className="mk-stat"><div className="l">Converted</div><div className="v tnum" style={{ color: "var(--green)" }}>43</div></div>
            </div>
            <div className="donut-row">
              <div className="donut" style={{ background: "conic-gradient(#2d6a4f 0 30%, #40916c 30% 52%, #74c69d 52% 70%, #95d5b2 70% 84%, #b7e4c7 84% 94%, #d8f3e6 94% 100%)" }}>
                <div className="center"><div className="n tnum">250</div><div className="t">TOTAL LEADS</div></div>
              </div>
              <div className="legend">
                {PROPERTIES.map((p) => (
                  <div className="row" key={p.name}>
                    <span className="sw" style={{ background: p.color }} />
                    <span className="nm">{p.name}</span>
                    <span className="vl tnum">{p.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Frame>
        </Reveal>
      </div>
    </section>
  );
}
