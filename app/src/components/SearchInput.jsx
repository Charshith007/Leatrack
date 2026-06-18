import { Icons } from "../icons.jsx";

export function SearchInput({ value, onChange, placeholder = "Filter by name" }) {
  return (
    <div style={{ position: "relative", width: 240 }}>
      <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)", display: "grid" }}><Icons.Search size={16} /></span>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ paddingLeft: 34, height: 38 }} />
    </div>
  );
}
