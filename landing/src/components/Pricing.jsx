import { Reveal } from "./Reveal.jsx";

const TIERS = [
  {
    tag: "Starter",
    price: "$29",
    period: "/mo",
    desc: "For solo agents getting organized.",
    features: ["Up to 500 leads", "Contact Manager pipeline", "Basic lead scoring", "1 user seat"],
    cta: "Start Free Trial",
    ctaClass: "btn-ghost",
  },
  {
    tag: "Growth",
    price: "$89",
    period: "/mo",
    desc: "For growing teams that need coordination.",
    features: ["Unlimited leads", "Advanced scoring & rules", "Real-time analytics", "Property-based distribution", "Up to 10 user seats"],
    cta: "Start Free Trial",
    ctaClass: "btn-white",
    popular: true,
  },
  {
    tag: "Enterprise",
    price: "Custom",
    desc: "For brokerages running at scale.",
    features: ["Everything in Growth", "Unlimited seats & roles", "Dedicated success manager", "SSO & priority support"],
    cta: "Contact Sales",
    ctaClass: "btn-ghost",
  },
];

export function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Pricing</span>
          <h2>Simple pricing that scales with you</h2>
          <p>Start free for 14 days. No credit card required.</p>
        </Reveal>
        <div className="tiers">
          {TIERS.map((t, i) => (
            <Reveal as="div" className={"tier" + (t.popular ? " pop" : "")} delay={i ? `${i * 0.08}s` : undefined} key={t.tag}>
              {t.popular && <span className="pop-badge">Most Popular</span>}
              <span className="tag">{t.tag}</span>
              <div className="price">{t.price}{t.period && <span>{t.period}</span>}</div>
              <p className="pdesc">{t.desc}</p>
              <ul>
                {t.features.map((f) => (
                  <li key={f}><span className="ck">✓</span>{f}</li>
                ))}
              </ul>
              <a className={"btn " + t.ctaClass} href="#" style={{ width: "100%" }}>{t.cta}</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
