import { initials, avatarColor } from "../lib/helpers.js";

export function Avatar({ first, last, size = 32 }) {
  const seed = (first || "") + (last || "");
  return (
    <span className="avatar" style={{ width: size, height: size, background: avatarColor(seed), fontSize: size * 0.38 }}>
      {initials(first, last).toUpperCase()}
    </span>
  );
}
