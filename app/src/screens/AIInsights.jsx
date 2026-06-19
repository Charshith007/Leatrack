import { useMemo } from "react";
import { Icons } from "../icons.jsx";
import { buildInsights } from "../lib/ai.js";
import { StatCard } from "../components/StatCard.jsx";
import { Donut } from "../components/Donut.jsx";
import { Avatar } from "../components/Avatar.jsx";
import { PredictionBadge, SegmentTag } from "../components/PredictionBadge.jsx";

const ACTION_ICON = { Phone: Icons.Phone, Mail: Icons.Mail, Spark: Icons.Spark };

export function AIInsights({ data, onNav }) {
  const insights = useMemo(() => buildInsights(data.contacts), [data.contacts]);
  const { avgProb, segCounts, buckets, top, dupGroups, enriched } = insights;
  const segTotal = segCounts.reduce((a, s) => a + s.value, 0);
  const maxBucket = Math.max(1, ...buckets.map((b) => b.count));
  const hotCount = segCounts.find((s) => s.label === "Hot mover")?.value || 0;
  const reEngageCount = segCounts.find((s) => s.label === "Re-engage")?.value || 0;

  const byId = (id) => data.contacts.find((c) => c.id === id);

  return (
    <div className="content-inner view-anim">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{ width: 34, height: 34, borderRadius: 9, background: "var(--ink)", color: "var(--rocket)", display: "grid", placeItems: "center" }}><Icons.Brain size={18} /></span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", color: "var(--text-3)" }}>PREDICTIVE INTELLIGENCE</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Where your pipeline is headed next</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard label="Avg. conversion likelihood" value={avgProb + "%"} sub="Across all active contacts" accent="var(--rocket)" icon={Icons.Target} />
        <StatCard label="Hot movers" value={hotCount} sub="Predicted ≥72% to convert" accent="var(--convert)" icon={Icons.Trend} />
        <StatCard label="Needs re-engagement" value={reEngageCount} sub="No activity in 14+ days" accent="var(--danger)" icon={Icons.AlertTriangle} />
        <StatCard label="Possible duplicates" value={dupGroups.length} sub="Matched by email or name + city" accent="#9a5bd6" icon={Icons.Layers} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Lead segments</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <Donut data={segCounts.filter((s) => s.value > 0)} total={segTotal} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {segCounts.map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flex: "none" }}></span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{s.label}</span>
                  <span className="tnum mono" style={{ fontSize: 13, fontWeight: 700 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Conversion likelihood distribution</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {buckets.map((b) => (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, fontWeight: 600, color: "var(--text-2)" }}>
                  <span>{b.label}</span><span className="tnum">{b.count}</span>
                </div>
                <div style={{ height: 9, borderRadius: 99, background: "#eef0f3", overflow: "hidden" }}>
                  <div style={{ width: (b.count / maxBucket) * 100 + "%", height: "100%", background: "var(--rocket)", borderRadius: 99, transition: "width .5s ease" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: 16 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Top predicted contacts</h3>
            <button className="btn btn-subtle btn-sm" onClick={() => onNav("contacts")}>Open Contact Manager <Icons.ChevronRight size={15} /></button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {top.map((c, i) => {
              const ActionIcon = ACTION_ICON[c.action.icon] || Icons.Spark;
              return (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < top.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <Avatar first={c.first} last={c.last} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{c.first} {c.last}</div>
                    <SegmentTag seg={c.seg} />
                  </div>
                  <div style={{ width: 110 }}><PredictionBadge prob={c.prob} /></div>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--text-2)", whiteSpace: "nowrap" }}>
                    <ActionIcon size={14} /> {c.action.label}
                  </span>
                </div>
              );
            })}
            {top.length === 0 && <div className="empty">No contacts yet.</div>}
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700 }}>Possible duplicate leads</h3>
          <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "var(--text-3)" }}>Matched by exact email, or same name + city.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {dupGroups.map((ids, i) => (
              <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "var(--danger)" }}>
                  <Icons.AlertTriangle size={14} /> Possible duplicate
                </div>
                {ids.map((id) => {
                  const c = byId(id);
                  if (!c) return null;
                  return (
                    <div key={id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar first={c.first} last={c.last} size={26} />
                      <div style={{ fontSize: 12.5 }}>
                        <b>{c.first} {c.last}</b> <span style={{ color: "var(--text-3)" }}>· {c.email}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            {dupGroups.length === 0 && <div className="empty">No likely duplicates found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
