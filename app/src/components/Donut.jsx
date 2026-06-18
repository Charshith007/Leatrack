export function Donut({ data, total, size = 188 }) {
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
