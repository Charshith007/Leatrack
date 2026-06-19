export function StatCard({ label, value, sub, accent, icon }) {
  const Icon = icon;
  return (
    <div className="card card-hover stat-card" style={{ "--accent": accent || "var(--rocket)", padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-2)", letterSpacing: ".02em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ width: 32, height: 32, borderRadius: 9, display: "grid", placeItems: "center",
          background: (accent || "var(--rocket)") + "1a", color: accent || "var(--rocket)" }}>
          {Icon && <Icon size={17} />}
        </span>
      </div>
      <div className="mono tnum" style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, letterSpacing: "-.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{sub}</div>}
    </div>
  );
}
