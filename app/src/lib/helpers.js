export const STAGE_META = {
  contact: { label: "Contact", color: "var(--contact)", desc: "Raw interest" },
  enrich:  { label: "Enrich",  color: "var(--enrich)",  desc: "Building interest" },
  convert: { label: "Convert", color: "var(--convert)", desc: "Hand to sales" },
};
export const STATUS_COLOR = {
  "Imported": "#8a93a3",
  "Not contacted": "#c0561f",
  "Contacted": "#3b6fe0",
  "Customer": "#18996a",
  "Closed": "#6b4ee0",
};
export const AVATAR_COLORS = ["#e0623b","#3b6fe0","#18996a","#9a5bd6","#d6a000","#0fa3b1","#d6457a","#5a6473"];

export function initials(f, l) { return ((f || "")[0] || "") + ((l || "")[0] || ""); }
export function avatarColor(seed) {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
export function fmtDate(iso) {
  const d = new Date(iso); const now = new Date();
  const days = Math.floor((now - d) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return days + "d ago";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
