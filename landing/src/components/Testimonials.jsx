import { Reveal } from "./Reveal.jsx";

const QUOTES = [
  {
    quote: "We stopped losing leads in the gap between marketing and sales. Lea Track paid for itself in the first month.",
    name: "Jordan Mills",
    co: "Sales Director, Northpoint Realty",
    initials: "JM",
    color: "#2d6a4f",
  },
  {
    quote: "The Contact → Enrich → Convert flow just makes sense. My agents finally know exactly who to call next.",
    name: "Priya Anand",
    co: "Broker, Vanguard Homes",
    initials: "PA",
    color: "#40916c",
  },
  {
    quote: "Lead scoring changed how we prioritize. We're converting 2x more without adding a single rep.",
    name: "Marcus Cole",
    co: "Marketing Lead, BlueKey Properties",
    initials: "MC",
    color: "#74c69d",
    textColor: "#14302480",
  },
];

export function Testimonials() {
  return (
    <section className="dark inv">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow inv">Loved by teams</span>
          <h2>Results that close deals</h2>
        </Reveal>
        <div className="quotes">
          {QUOTES.map((q, i) => (
            <Reveal as="div" className="quote" delay={i ? `${i * 0.08}s` : undefined} key={q.name}>
              <div className="stars">★★★★★</div>
              <p className="q">"{q.quote}"</p>
              <div className="who">
                <span className="av" style={{ background: q.color, color: q.textColor }}>{q.initials}</span>
                <div>
                  <div className="nm">{q.name}</div>
                  <div className="co">{q.co}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
