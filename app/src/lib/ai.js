// LEA Track AI layer — lightweight, explainable heuristics standing in for the
// ML services described in the backlog (scoring, segmentation, prediction,
// nurture recommendations, duplicate detection). Pure functions of existing
// contact fields, so results are deterministic and reproducible.

const SOURCE_WEIGHT = {
  "Referral": 14, "Open house": 9, "Web form": 6, "Zillow": 4, "Social media": 3, "Cold list": -2,
};

export function daysSince(iso) {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
}

// 0-99 likelihood the contact converts, blending score, stage, recency and source quality.
export function conversionProbability(c) {
  const stageWeight = { contact: 0, enrich: 10, convert: 18 }[c.stage] || 0;
  const recency = Math.max(0, 16 - daysSince(c.updated)); // fresher contact = warmer signal
  const raw = c.score * 0.62 + stageWeight + recency * 0.9 + (SOURCE_WEIGHT[c.source] ?? 0);
  return Math.max(1, Math.min(99, Math.round(raw)));
}

export const SEGMENTS = {
  hot: { id: "hot", label: "Hot mover", color: "var(--convert)" },
  rising: { id: "rising", label: "Steady riser", color: "var(--contact)" },
  spark: { id: "spark", label: "New spark", color: "var(--enrich)" },
  cooling: { id: "cooling", label: "Re-engage", color: "var(--danger)" },
  slow: { id: "slow", label: "Slow burner", color: "var(--text-3)" },
};

// Clusters a contact into one of five personas — stands in for the
// clustering-based segmentation workflow.
export function segment(c, prob = conversionProbability(c)) {
  const stale = daysSince(c.updated) > 14;
  if (stale && c.stage !== "convert") return SEGMENTS.cooling;
  if (prob >= 72) return SEGMENTS.hot;
  if (prob >= 50) return SEGMENTS.rising;
  if (prob < 28) return SEGMENTS.slow;
  return SEGMENTS.spark;
}

const ACTION_BY_SEGMENT = {
  hot: { label: "Call now", icon: "Phone" },
  rising: { label: "Send pricing info", icon: "Mail" },
  spark: { label: "Schedule intro call", icon: "Phone" },
  cooling: { label: "Re-engagement nudge", icon: "Spark" },
  slow: { label: "Add to nurture drip", icon: "Mail" },
};

// Next-best-action recommendation — stands in for the nurture recommendation engine.
export function nextAction(c) {
  const seg = segment(c);
  return { ...ACTION_BY_SEGMENT[seg.id], segment: seg };
}

function normEmail(e) { return (e || "").trim().toLowerCase(); }
function normName(c) { return ((c.first || "") + " " + (c.last || "")).trim().toLowerCase(); }

// Flags likely duplicate contacts by exact email match or same name + city —
// stands in for the duplicate / suspicious-lead detector.
export function findDuplicates(contacts) {
  const byEmail = new Map();
  const byName = new Map();
  contacts.forEach((c) => {
    const e = normEmail(c.email);
    const n = normName(c) + "|" + (c.city || "").toLowerCase();
    if (e) byEmail.set(e, [...(byEmail.get(e) || []), c.id]);
    if (n.trim() !== "|") byName.set(n, [...(byName.get(n) || []), c.id]);
  });
  const dupIds = new Set();
  const groups = [];
  [...byEmail.values(), ...byName.values()].forEach((ids) => {
    if (ids.length > 1) { ids.forEach((id) => dupIds.add(id)); groups.push(ids); }
  });
  return { dupIds, groups };
}

// Aggregate insight summary used by the AI Insights dashboard.
export function buildInsights(contacts) {
  const enriched = contacts.map((c) => {
    const prob = conversionProbability(c);
    return { ...c, prob, seg: segment(c, prob), action: nextAction(c) };
  });
  const avgProb = enriched.length ? Math.round(enriched.reduce((a, c) => a + c.prob, 0) / enriched.length) : 0;
  const buckets = [
    { label: "0–25%", min: 0, max: 25, count: 0 },
    { label: "26–50%", min: 26, max: 50, count: 0 },
    { label: "51–75%", min: 51, max: 75, count: 0 },
    { label: "76–99%", min: 76, max: 99, count: 0 },
  ];
  enriched.forEach((c) => { const b = buckets.find((b) => c.prob >= b.min && c.prob <= b.max); if (b) b.count++; });

  const segCounts = Object.values(SEGMENTS).map((s) => ({
    label: s.label, color: s.color, value: enriched.filter((c) => c.seg.id === s.id).length,
  }));

  const actionCounts = {};
  enriched.forEach((c) => { actionCounts[c.action.label] = (actionCounts[c.action.label] || 0) + 1; });

  const { dupIds, groups } = findDuplicates(contacts);

  const top = [...enriched].sort((a, b) => b.prob - a.prob).slice(0, 6);

  return { enriched, avgProb, buckets, segCounts, actionCounts, dupIds, dupGroups: groups, top };
}
