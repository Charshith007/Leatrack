import { useMemo } from "react";
import { Icons } from "../icons.jsx";
import { PROPERTIES } from "../lib/data.js";
import { STAGE_META, fmtDate } from "../lib/helpers.js";
import { buildInsights } from "../lib/ai.js";
import { StatCard } from "../components/StatCard.jsx";
import { Donut } from "../components/Donut.jsx";

export function Dashboard({ data, onNav }) {
  const { contacts, leads, activity } = data;
  const byStage = (s) => contacts.filter((c) => c.stage === s).length;
  const insights = useMemo(() => buildInsights(contacts), [contacts]);

  const propStats = useMemo(() => {
    const map = {};
    contacts.forEach((c) => { map[c.property] = (map[c.property] || 0) + 1; });
    const palette = ["#f15a2b","#3b6fe0","#18996a","#9a5bd6","#d6a000","#0fa3b1"];
    return PROPERTIES.map((p, i) => ({ label: p, value: map[p] || 0, color: palette[i % palette.length] }))
      .filter((d) => d.value > 0).sort((a, b) => b.value - a.value);
  }, [contacts]);

  const total = contacts.length;
  const convRate = total ? Math.round((byStage("convert") / total) * 100) : 0;

  const ACTIVITY_ICON = { added: Icons.Plus, enriched: Icons.Spark, moved: Icons.ArrowRight, graduated: Icons.Trend, emailed: Icons.Mail, called: Icons.Phone, imported: Icons.Upload };

  const FunnelRow = ({ stage }) => {
    const m = STAGE_META[stage]; const n = byStage(stage);
    const pct = total ? Math.round((n / total) * 100) : 0;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13.5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: m.color }}></span>{m.label}
            <span style={{ color: "var(--text-3)", fontWeight: 500 }}>· {m.desc}</span>
          </span>
          <span className="tnum mono" style={{ fontWeight: 700, fontSize: 14 }}>{n}<span style={{ color: "var(--text-3)", fontWeight: 600, fontSize: 12 }}> · {pct}%</span></span>
        </div>
        <div style={{ height: 9, borderRadius: 99, background: "#eef0f3", overflow: "hidden" }}>
          <div style={{ width: pct + "%", height: "100%", background: m.color, borderRadius: 99, transition: "width .5s ease" }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="content-inner view-anim">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard label="Total leads" value={total} sub="Across all properties" accent="var(--rocket)" icon={Icons.Contacts} />
        <StatCard label="In Contact" value={byStage("contact")} sub="Raw interest" accent="var(--contact)" icon={Icons.Dot} />
        <StatCard label="In Enrich" value={byStage("enrich")} sub="Being nurtured" accent="var(--enrich)" icon={Icons.Spark} />
        <StatCard label="Conversion rate" value={convRate + "%"} sub={byStage("convert") + " ready for sales"} accent="var(--convert)" icon={Icons.Trend} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)", gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Leads by property</h3>
            <button className="btn btn-subtle btn-sm" onClick={() => onNav("contacts")}>View all <Icons.ChevronRight size={15} /></button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <Donut data={propStats} total={total} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {propStats.map((p) => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: p.color, flex: "none" }}></span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.label}</span>
                  <span className="tnum mono" style={{ fontSize: 13, fontWeight: 700 }}>{p.value}</span>
                  <span className="tnum" style={{ fontSize: 11.5, color: "var(--text-3)", minWidth: 34, textAlign: "right" }}>{Math.round((p.value / (total || 1)) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Pipeline stages</h3>
          <FunnelRow stage="contact" />
          <FunnelRow stage="enrich" />
          <FunnelRow stage="convert" />
          <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: "var(--rocket-50)", color: "var(--rocket)", display: "grid", placeItems: "center" }}><Icons.Leads size={16} /></span>
            <span style={{ fontSize: 13, color: "var(--text-2)" }}><b style={{ color: "var(--text)" }}>{leads.length} qualified leads</b> handed to sales</span>
          </div>
        </div>
      </div>

      <div className="card card-hover" style={{ padding: 22, marginBottom: 16, display: "flex", alignItems: "center", gap: 18, cursor: "pointer" }} onClick={() => onNav("insights")}>
        <span style={{ width: 44, height: 44, borderRadius: 11, background: "var(--ink)", color: "var(--rocket)", display: "grid", placeItems: "center", flex: "none" }}><Icons.Brain size={22} /></span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", color: "var(--text-3)", marginBottom: 2 }}>AI INSIGHTS</div>
          <div style={{ fontSize: 14.5, fontWeight: 700 }}>Average predicted conversion likelihood: <span style={{ color: "var(--rocket)" }}>{insights.avgProb}%</span></div>
          <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 1 }}>{insights.segCounts.find((s) => s.label === "Hot mover")?.value || 0} hot movers · {insights.dupGroups.length} possible duplicates flagged</div>
        </div>
        <button className="btn btn-subtle btn-sm">Open AI Insights <Icons.ChevronRight size={15} /></button>
      </div>

      <div className="card" style={{ padding: 22 }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Recent activity</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {activity.map((a, i) => {
            const ActIcon = ACTIVITY_ICON[a.verb] || Icons.Dot;
            return (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none" }}>
                <span style={{ width: 26, height: 26, borderRadius: 8, background: "var(--rocket-50)", color: "var(--rocket)", display: "grid", placeItems: "center", flex: "none" }}>
                  <ActIcon size={14} />
                </span>
                <span style={{ fontSize: 13.5, flex: 1 }}><b>{a.who}</b> {a.verb} <b>{a.target}</b> {a.tail}</span>
                <span style={{ fontSize: 12, color: "var(--text-3)" }}>{fmtDate(a.when)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
