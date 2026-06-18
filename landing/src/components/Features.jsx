import { Reveal } from "./Reveal.jsx";

const FEATURES = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8L20 9.2l-4.7 3.6L17 19l-5-3.5L7 19l1.7-6.2L4 9.2l6.1-.4z" /></svg>,
    title: "Lead Scoring & Prioritization",
    desc: "Every lead gets a live score so your team works the hottest prospects first — never guessing.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></svg>,
    title: "Automated Lead Capture",
    desc: "Pull leads from forms, open houses, and uploads straight into one pipeline — no manual entry.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></svg>,
    title: "Contact Manager",
    desc: "A clean 3-stage pipeline — Contact, Enrich, Convert — so everyone knows the next move.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>,
    title: "Real-time Analytics",
    desc: "Dashboards and reports show pipeline health and conversion rates at a glance.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    title: "Team Coordination",
    desc: "Bridge Sales and Marketing with shared context, handoffs, and roles built in.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>,
    title: "Property-Based Distribution",
    desc: "Route leads to the right agent by property, region, or rule — automatically.",
  },
];

export function Features() {
  return (
    <section id="features">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">Features</span>
          <h2>Everything your team needs.<br />Nothing they don't.</h2>
        </Reveal>
        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <Reveal as="div" className="feat" delay={i % 3 ? `${(i % 3) * 0.06}s` : undefined} key={f.title}>
              <div className="ic">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
