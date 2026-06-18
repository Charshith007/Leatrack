import { useState, useEffect } from "react";
import { Avatar } from "../components/Avatar.jsx";

const LIVE_LEADS = [
  { first: "Olivia", last: "Bennett", src: "Web form" },
  { first: "Diego", last: "Acosta", src: "Open house" },
  { first: "Mei", last: "Nguyen", src: "Referral" },
  { first: "Omar", last: "Whitman", src: "Zillow" },
];
const LIVE_STAGES = [
  { key: "contact", label: "Contact", color: "#5b8def", count: 128, score: 14 },
  { key: "enrich", label: "Enrich", color: "#f0a93a", count: 79, score: 53 },
  { key: "convert", label: "Convert", color: "#2fc28a", count: 43, score: 91 },
];

export function LivePipeline() {
  const [stage, setStage] = useState(0);
  const [lead, setLead] = useState(0);
  const [converted, setConverted] = useState(43);
  useEffect(() => {
    const t = setInterval(() => {
      setStage((s) => {
        if (s === 2) { setLead((l) => (l + 1) % LIVE_LEADS.length); setConverted((c) => c + 1); return 0; }
        return s + 1;
      });
    }, 1900);
    return () => clearInterval(t);
  }, []);
  const L = LIVE_LEADS[lead];
  const st = LIVE_STAGES[stage];

  return (
    <div style={{ position: "relative", borderRadius: 16, padding: 18, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", boxShadow: "0 20px 50px -24px rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: "#2fc28a", animation: "liveDot 2s infinite" }}></span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", letterSpacing: ".02em" }}>Live pipeline</span>
        <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 600, color: "#7d869a" }}>Updated just now</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {LIVE_STAGES.map((s, i) => {
          const active = stage === i;
          return (
            <div key={s.key} style={{ borderRadius: 11, padding: "10px 11px", background: active ? s.color + "26" : "rgba(255,255,255,.03)", border: `1px solid ${active ? s.color : "rgba(255,255,255,.08)"}`, transition: "background .4s, border-color .4s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: s.color }}></span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: active ? "#fff" : "#aeb6c4" }}>{s.label}</span>
              </div>
              <div className="tnum mono" style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{i === 2 ? converted : s.count}</div>
              <div style={{ fontSize: 10, color: "#7d869a", fontWeight: 600, marginTop: 2 }}>leads</div>
            </div>
          );
        })}
      </div>

      <div key={stage + "-" + lead} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 12px", borderRadius: 11, background: "rgba(255,255,255,.05)", border: `1px solid ${st.color}55`, animation: "chipPop .4s ease" }}>
        <Avatar first={L.first} last={L.last} size={36} />
        <div style={{ lineHeight: 1.25, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: "#fff", whiteSpace: "nowrap" }}>{L.first} {L.last}</div>
          <div style={{ fontSize: 11, color: "#7d869a" }}>{L.src}</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>
            <div style={{ width: 52, height: 6, borderRadius: 99, background: "rgba(255,255,255,.12)", overflow: "hidden" }}>
              <span style={{ display: "block", height: "100%", width: st.score + "%", background: st.color, borderRadius: 99, transition: "width .5s ease" }}></span>
            </div>
            <span className="tnum mono" style={{ fontSize: 13, fontWeight: 700, color: st.color, minWidth: 20 }}>{st.score}</span>
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: "#7d869a", marginTop: 3 }}>{stage === 0 ? "Captured" : stage === 1 ? "Nurturing →" : "Sent to Sales ✓"}</div>
        </div>
      </div>
    </div>
  );
}
