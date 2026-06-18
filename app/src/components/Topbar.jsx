import { Icons } from "../icons.jsx";

export function Topbar({ title, subtitle, onToggleSidebar, actions }) {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 30px",
      borderBottom: "1px solid var(--border)", background: "var(--surface)", flex: "none" }}>
      <button className="icon-btn" onClick={onToggleSidebar} title="Toggle menu"><Icons.Menu size={20} /></button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: "-.01em" }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{actions}</div>
    </header>
  );
}
