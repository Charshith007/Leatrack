export function ScoreBar({ score }) {
  const color = score >= 70 ? "var(--convert)" : score >= 40 ? "var(--enrich)" : "var(--contact)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div className="scorebar"><span style={{ width: score + "%", background: color }}></span></div>
      <span className="tnum mono" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-2)", minWidth: 18 }}>{score}</span>
    </div>
  );
}
