// LEA Track — shared UI components
const { useState, useEffect, useRef, useMemo } = React;

const STAGE_META = {
  contact: { label: "Contact", color: "var(--contact)", desc: "Raw interest" },
  enrich:  { label: "Enrich",  color: "var(--enrich)",  desc: "Building interest" },
  convert: { label: "Convert", color: "var(--convert)", desc: "Hand to sales" },
};
const STATUS_COLOR = {
  "Imported": "#8a93a3",
  "Not contacted": "#c0561f",
  "Contacted": "#3b6fe0",
  "Customer": "#18996a",
  "Closed": "#6b4ee0",
};
const AVATAR_COLORS = ["#e0623b","#3b6fe0","#18996a","#9a5bd6","#d6a000","#0fa3b1","#d6457a","#5a6473"];

function initials(f, l) { return ((f || "")[0] || "") + ((l || "")[0] || ""); }
function avatarColor(seed) {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function fmtDate(iso) {
  const d = new Date(iso); const now = new Date();
  const days = Math.floor((now - d) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return days + "d ago";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function Avatar({ first, last, size = 32 }) {
  const seed = (first || "") + (last || "");
  return (
    <span className="avatar" style={{ width: size, height: size, background: avatarColor(seed), fontSize: size * 0.38 }}>
      {initials(first, last).toUpperCase()}
    </span>
  );
}

function StageBadge({ stage }) {
  const m = STAGE_META[stage] || STAGE_META.contact;
  return <span className={"badge badge-stage-" + stage}><span className="dot"></span>{m.label}</span>;
}

function StatusPill({ status }) {
  return (
    <span className="status">
      <span className="sdot" style={{ background: STATUS_COLOR[status] || "#8a93a3" }}></span>
      {status}
    </span>
  );
}

function ScoreBar({ score }) {
  const color = score >= 70 ? "var(--convert)" : score >= 40 ? "var(--enrich)" : "var(--contact)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div className="scorebar"><span style={{ width: score + "%", background: color }}></span></div>
      <span className="tnum mono" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-2)", minWidth: 18 }}>{score}</span>
    </div>
  );
}

// ---------- Donut chart (SVG) ----------
function Donut({ data, total, size = 188 }) {
  const r = size / 2 - 16, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  let acc = 0;
  const sum = data.reduce((a, d) => a + d.value, 0) || 1;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eef0f3" strokeWidth="16" />
      {data.map((d, i) => {
        const frac = d.value / sum;
        const dash = frac * circ;
        const seg = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth="16"
            strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-acc * circ}
            transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt">
            <title>{d.label}: {d.value}</title>
          </circle>
        );
        acc += frac;
        return seg;
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" className="mono tnum" style={{ fontSize: 30, fontWeight: 700, fill: "var(--text)" }}>{total}</text>
      <text x={cx} y={cy + 16} textAnchor="middle" style={{ fontSize: 11, fontWeight: 600, fill: "var(--text-3)", letterSpacing: ".04em" }}>TOTAL LEADS</text>
    </svg>
  );
}

// ---------- Stat card ----------
function StatCard({ label, value, sub, accent, icon }) {
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

// ---------- Sidebar ----------
function Sidebar({ route, onNav, collapsed, onLogout, counts }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: Icons.Grid },
    { id: "contacts", label: "Contact Manager", icon: Icons.Contacts, count: counts.contacts },
    { id: "leads", label: "Lead Manager", icon: Icons.Leads, count: counts.leads },
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

// ---------- Topbar ----------
function Topbar({ title, subtitle, onToggleSidebar, actions }) {
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

// ---------- Search input ----------
function SearchInput({ value, onChange, placeholder = "Filter by name" }) {
  return (
    <div style={{ position: "relative", width: 240 }}>
      <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)", display: "grid" }}><Icons.Search size={16} /></span>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ paddingLeft: 34, height: 38 }} />
    </div>
  );
}

// ---------- Modal ----------
function Modal({ title, children, onClose, footer }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal scrollbar" role="dialog" aria-modal="true">
        <div className="modal-head">
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h2>
          <button className="icon-btn" onClick={onClose}><Icons.X size={18} /></button>
        </div>
        <div className="modal-body scrollbar">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

// ---------- Toast ----------
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = (msg) => {
    const id = LeaData.uid();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };
  const node = (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div className="toast" key={t.id}><Icons.Check size={15} stroke={2.5} />{t.msg}</div>
      ))}
    </div>
  );
  return [push, node];
}

Object.assign(window, {
  STAGE_META, STATUS_COLOR, AVATAR_COLORS, initials, avatarColor, fmtDate,
  Avatar, StageBadge, StatusPill, ScoreBar, Donut, StatCard,
  Sidebar, Topbar, SearchInput, Modal, useToasts,
});
