import { Icons } from "../icons.jsx";
import { Avatar } from "./Avatar.jsx";

export function Sidebar({ route, onNav, collapsed, onLogout, counts }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: Icons.Grid },
    { id: "contacts", label: "Contact Manager", icon: Icons.Contacts, count: counts.contacts },
    { id: "leads", label: "Lead Manager", icon: Icons.Leads, count: counts.leads },
    { id: "insights", label: "AI Insights", icon: Icons.Brain },
    { id: "users", label: "User Manager", icon: Icons.Users },
  ];
  return (
    <aside className={"sidebar" + (collapsed ? " collapsed" : "")}>
      <div style={{ padding: "20px 18px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: 9, background: "var(--rocket)", display: "grid", placeItems: "center", color: "#fff", boxShadow: "0 3px 10px rgba(225,90,43,.4)" }}>
          <Icons.Rocket size={19} />
        </span>
        <div style={{ lineHeight: 1.1 }}>
          <div className="mono" style={{ fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: "-.01em" }}>LEA Track</div>
          <div style={{ fontSize: 10.5, color: "#7d869a", fontWeight: 600, letterSpacing: ".06em" }}>LEAD MANAGEMENT</div>
        </div>
      </div>

      <div style={{ padding: "8px 12px 0", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "#5b6479", letterSpacing: ".08em", padding: "10px 12px 6px" }}>WORKSPACE</div>
        {items.map((it) => {
          const active = route === it.id;
          return (
            <button key={it.id} onClick={() => onNav(it.id)}
              style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", border: "none",
                background: active ? "var(--ink-700)" : "transparent", color: active ? "#fff" : "#aeb6c4",
                padding: "10px 12px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, textAlign: "left",
                transition: "background .12s, color .12s", position: "relative" }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--ink-700)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = active ? "var(--ink-700)" : "transparent"; }}>
              {active && <span style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 3, borderRadius: 99, background: "var(--rocket)" }}></span>}
              <it.icon size={18} stroke={active ? 2.3 : 2} />
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.count != null && <span className="tnum" style={{ fontSize: 11.5, fontWeight: 700, color: active ? "#fff" : "#7d869a", background: active ? "rgba(255,255,255,.12)" : "transparent", padding: "1px 7px", borderRadius: 99 }}>{it.count}</span>}
            </button>
          );
        })}
      </div>

      <div style={{ padding: 12, borderTop: "1px solid var(--ink-700)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px" }}>
          <Avatar first="S" last="R" size={34} />
          <div style={{ lineHeight: 1.2, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Shruthi R.</div>
            <div style={{ fontSize: 11.5, color: "#7d869a" }}>Admin</div>
          </div>
        </div>
        <button onClick={onLogout}
          style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", border: "none", background: "transparent",
            color: "#aeb6c4", padding: "10px 12px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, marginTop: 2 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ink-700)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#aeb6c4"; }}>
          <Icons.Logout size={18} /> Log out
        </button>
      </div>
    </aside>
  );
}
