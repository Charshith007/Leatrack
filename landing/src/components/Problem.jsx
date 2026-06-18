import { Reveal } from "./Reveal.jsx";

const PAINS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    ),
    title: "No single source for leads",
    desc: "Leads scatter across inboxes, spreadsheets, and sticky notes — with no one place to see them all.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
        <line x1="3" y1="3" x2="21" y2="21" />
      </svg>
    ),
    title: "No visibility into behavior",
    desc: "Without tracking what a lead does, your team is guessing who's ready to buy — and who's gone cold.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Poor Sales & Marketing sync",
    desc: "Marketing hands off leads Sales never works. Hot prospects stall in the gap between the two teams.",
  },
];

export function Problem() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal className="sec-head">
          <div className="big-stat"><div className="num">30%</div></div>
          <h2 style={{ marginTop: 18 }}>of leads are never followed up.<br />Is yours one of them?</h2>
          <p>Most teams lose deals not from bad leads — but from leads that fall through the cracks. Here's where it breaks down.</p>
        </Reveal>
        <div className="cards-3">
          {PAINS.map((p, i) => (
            <Reveal as="div" className="pain" delay={i ? `${i * 0.08}s` : undefined} key={p.title}>
              <div className="ic">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
