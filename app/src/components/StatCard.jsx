export function StatCard({ label, value, sub, accent, icon }) {
  const Icon = icon;
  return (
    <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-2)" }}>{label}</span>
        <span style={{ width: 32, height: 32, borderRadius: 9, display: "grid", placeItems: "center",
          background: (accent || "var(--rocket)") + "1a", color: accent || "var(--rocket)" }}>
          {Icon && <Icon size={17} />}
        </span>
      </div>
      <div className="mono tnum" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{sub}</div>}
    </div>
  );
}
