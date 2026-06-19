export function PredictionBadge({ prob }) {
  const color = prob >= 72 ? "var(--convert)" : prob >= 50 ? "var(--contact)" : prob >= 28 ? "var(--enrich)" : "var(--text-3)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div className="scorebar"><span style={{ width: prob + "%", background: color }}></span></div>
      <span className="tnum mono" style={{ fontSize: 12.5, fontWeight: 700, color, minWidth: 28 }}>{prob}%</span>
    </div>
  );
}

export function SegmentTag({ seg }) {
  return (
    <span className="badge" style={{ color: seg.color, background: seg.color + "1a" }}>
      <span className="dot"></span>{seg.label}
    </span>
  );
}
