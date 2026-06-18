import { Reveal } from "./Reveal.jsx";
import { Frame } from "./Frame.jsx";

function ScoreBar({ value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 48, height: 6, borderRadius: 9, background: "#eef1ef", overflow: "hidden" }}>
        <span style={{ display: "block", height: "100%", width: value + "%", background: color }} />
      </div>
      <b className="tnum" style={{ color: "#14181a" }}>{value}</b>
    </div>
  );
}

function MkTabs({ active, colors }) {
  const labels = ["Contact", "Enrich", "Convert"];
  return (
    <div className="mk-tabs">
      {labels.map((label, i) => (
        <span key={label} className={"mk-tab " + (i === active ? "on" : "off")}
          style={i === active ? { background: colors[i].on, color: colors[i].onText } : undefined}>
          <span className="d" style={{ background: i === active ? (colors[i].onText || "#fff") : colors[i].off }} />
          {label}
        </span>
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="dark inv" id="how">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow inv">The Lea Track method</span>
          <h2>From Contact to Conversion —<br />in 3 simple steps</h2>
        </Reveal>

        {/* Step 1: Generate */}
        <Reveal as="div" className="step">
          <div className="step-text">
            <span className="step-num">1</span>
            <h3>Generate</h3>
            <p className="desc">Capture every lead in one centralized place — web forms, open houses, referrals, and imports all flow into a single Contact pipeline.</p>
          </div>
          <div className="step-mock">
            <Frame url="app.leatrack.io/contacts">
              <MkTabs active={0} colors={[{ on: "#2d6a4f", off: "#74c69d" }, { off: "#74c69d" }, { off: "#95d5b2" }]} />
              <table className="mk-tbl">
                <thead><tr><th>Name</th><th className="hide-sm">Email</th><th>Source</th><th>Status</th></tr></thead>
                <tbody>
                  <tr>
                    <td><div className="mk-name"><span className="mk-av" style={{ background: "#2d6a4f" }}>OB</span><span className="nm">Olivia Bennett</span></div></td>
                    <td className="hide-sm">olivia.b@email.com</td><td>Web form</td>
                    <td><span className="mk-status" style={{ color: "#c0561f" }}><span className="sd" style={{ background: "#c0561f" }} />Not contacted</span></td>
                  </tr>
                  <tr>
                    <td><div className="mk-name"><span className="mk-av" style={{ background: "#40916c" }}>LX</span><span className="nm">Logan Xu</span></div></td>
                    <td className="hide-sm">logan.x@email.com</td><td>Open house</td>
                    <td><span className="mk-status" style={{ color: "#3b6fe0" }}><span className="sd" style={{ background: "#3b6fe0" }} />Contacted</span></td>
                  </tr>
                  <tr>
                    <td><div className="mk-name"><span className="mk-av" style={{ background: "#74c69d" }}>NR</span><span className="nm">Nadia Reyes</span></div></td>
                    <td className="hide-sm">nadia.r@email.com</td><td>Referral</td>
                    <td><span className="mk-status" style={{ color: "#8b958f" }}><span className="sd" style={{ background: "#8b958f" }} />Imported</span></td>
                  </tr>
                </tbody>
              </table>
            </Frame>
          </div>
        </Reveal>

        {/* Step 2: Enrich */}
        <Reveal as="div" className="step rev">
          <div className="step-text">
            <span className="step-num" style={{ background: "#40916c" }}>2</span>
            <h3>Enrich</h3>
            <p className="desc">Nurture promising leads with targeted, personalized outreach. Lead scores rise as interest builds — so you always know who's heating up.</p>
          </div>
          <div className="step-mock">
            <Frame url="app.leatrack.io/contacts">
              <MkTabs active={1} colors={[{ off: "#2d6a4f" }, { on: "#40916c" }, { off: "#95d5b2" }]} />
              <table className="mk-tbl">
                <thead><tr><th>Name</th><th className="hide-sm">City</th><th>Score</th><th>Status</th></tr></thead>
                <tbody>
                  <tr>
                    <td><div className="mk-name"><span className="mk-av" style={{ background: "#2d6a4f" }}>SQ</span><span className="nm">Sophia Quinn</span></div></td>
                    <td className="hide-sm">Boulder, CO</td>
                    <td><ScoreBar value={62} color="#40916c" /></td>
                    <td><span className="mk-status" style={{ color: "#3b6fe0" }}><span className="sd" style={{ background: "#3b6fe0" }} />Contacted</span></td>
                  </tr>
                  <tr>
                    <td><div className="mk-name"><span className="mk-av" style={{ background: "#40916c" }}>JU</span><span className="nm">Jackson Underwood</span></div></td>
                    <td className="hide-sm">Seattle, WA</td>
                    <td><ScoreBar value={54} color="#40916c" /></td>
                    <td><span className="mk-status" style={{ color: "#3b6fe0" }}><span className="sd" style={{ background: "#3b6fe0" }} />Contacted</span></td>
                  </tr>
                  <tr>
                    <td><div className="mk-name"><span className="mk-av" style={{ background: "#74c69d" }}>AM</span><span className="nm">Amelia Mercer</span></div></td>
                    <td className="hide-sm">Austin, TX</td>
                    <td><ScoreBar value={48} color="#40916c" /></td>
                    <td><span className="mk-status" style={{ color: "#18996a" }}><span className="sd" style={{ background: "#18996a" }} />Customer</span></td>
                  </tr>
                </tbody>
              </table>
            </Frame>
          </div>
        </Reveal>

        {/* Step 3: Convert */}
        <Reveal as="div" className="step">
          <div className="step-text">
            <span className="step-num" style={{ background: "#74c69d", color: "#14302480" }}>3</span>
            <h3>Convert</h3>
            <p className="desc">Hand qualified leads to Sales the moment they cross your threshold — with full context, so reps close instead of chasing.</p>
          </div>
          <div className="step-mock">
            <Frame url="app.leatrack.io/contacts">
              <MkTabs active={2} colors={[{ off: "#2d6a4f" }, { off: "#40916c" }, { on: "#1b4332" }]} />
              <table className="mk-tbl">
                <thead><tr><th>Name</th><th className="hide-sm">Property</th><th>Score</th><th>Action</th></tr></thead>
                <tbody>
                  {[
                    { i: "DA", c: "#2d6a4f", nm: "Diego Acosta", prop: "Maple Grove", score: 91 },
                    { i: "FP", c: "#40916c", nm: "Fatima Patel", prop: "Harbor View", score: 88 },
                    { i: "RY", c: "#74c69d", nm: "Ravi Young", prop: "Cedar Ridge", score: 84 },
                  ].map((r) => (
                    <tr key={r.nm}>
                      <td><div className="mk-name"><span className="mk-av" style={{ background: r.c }}>{r.i}</span><span className="nm">{r.nm}</span></div></td>
                      <td className="hide-sm">{r.prop}</td>
                      <td><b className="tnum" style={{ color: "#2d6a4f" }}>{r.score}</b></td>
                      <td><span style={{ fontSize: 11, fontWeight: 700, color: "#1b4332", background: "#d8f3e6", padding: "4px 9px", borderRadius: 6 }}>Graduate →</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Frame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
