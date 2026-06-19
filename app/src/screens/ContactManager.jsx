import { useState, useMemo, useRef } from "react";
import { Icons } from "../icons.jsx";
import { uid, PROPERTIES } from "../lib/data.js";
import { STAGE_META } from "../lib/helpers.js";
import { buildInsights } from "../lib/ai.js";
import { Avatar } from "../components/Avatar.jsx";
import { StatusPill } from "../components/Badges.jsx";
import { ScoreBar } from "../components/ScoreBar.jsx";
import { PredictionBadge } from "../components/PredictionBadge.jsx";
import { SearchInput } from "../components/SearchInput.jsx";
import { Modal } from "../components/Modal.jsx";
import { ContactForm, blankContact } from "./ContactForm.jsx";

const ACTION_ICON = { Phone: Icons.Phone, Mail: Icons.Mail, Spark: Icons.Spark };

export function ContactManager({ data, setData, toast }) {
  const [tab, setTab] = useState("contact");
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blankContact("contact"));
  const fileRef = useRef(null);

  const tabs = [
    { id: "contact", label: "Contact", desc: "Raw interest" },
    { id: "enrich", label: "Enrich", desc: "Building interest" },
    { id: "convert", label: "Convert", desc: "Hand to sales" },
  ];

  const rows = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return data.contacts.filter((c) => c.stage === tab)
      .filter((c) => !ql || (c.first + " " + c.last).toLowerCase().includes(ql) || c.email.toLowerCase().includes(ql))
      .sort((a, b) => b.score - a.score);
  }, [data.contacts, tab, q]);

  const counts = { contact: 0, enrich: 0, convert: 0 };
  data.contacts.forEach((c) => counts[c.stage]++);

  const insights = useMemo(() => buildInsights(data.contacts), [data.contacts]);
  const enrichedById = useMemo(() => {
    const m = new Map();
    insights.enriched.forEach((c) => m.set(c.id, c));
    return m;
  }, [insights]);

  const advance = (c) => {
    const order = ["contact", "enrich", "convert"];
    const idx = order.indexOf(c.stage);
    if (c.stage === "convert") {
      setData((d) => ({
        ...d,
        contacts: d.contacts.filter((x) => x.id !== c.id),
        leads: [{ ...c, status: "Customer", updated: new Date().toISOString() }, ...d.leads],
        activity: [{ id: uid(), who: "You", verb: "graduated", target: c.first + " " + c.last, tail: "to Lead Manager", when: new Date().toISOString() }, ...d.activity].slice(0, 8),
      }));
      toast(`${c.first} graduated to Lead Manager`);
      return;
    }
    const next = order[idx + 1];
    setData((d) => ({
      ...d,
      contacts: d.contacts.map((x) => x.id === c.id ? { ...x, stage: next, score: Math.min(99, x.score + 22), status: next === "enrich" ? "Contacted" : "Customer", updated: new Date().toISOString() } : x),
      activity: [{ id: uid(), who: "You", verb: "moved", target: c.first + " " + c.last, tail: "to " + STAGE_META[next].label, when: new Date().toISOString() }, ...d.activity].slice(0, 8),
    }));
    toast(`${c.first} moved to ${STAGE_META[next].label}`);
  };

  const save = () => {
    if (!form.first.trim() || !form.last.trim() || !form.email.trim()) { toast("First, last and email are required"); return; }
    const c = { ...form, id: uid(), stage: tab, score: tab === "contact" ? 12 : tab === "enrich" ? 48 : 80, updated: new Date().toISOString() };
    setData((d) => ({ ...d,
      contacts: [c, ...d.contacts],
      activity: [{ id: uid(), who: "You", verb: "added", target: c.first + " " + c.last, tail: "to " + STAGE_META[tab].label, when: new Date().toISOString() }, ...d.activity].slice(0, 8),
    }));
    setAdding(false); setForm(blankContact(tab)); toast("Contact added");
  };

  const exportCsv = () => {
    const cols = ["first","last","email","city","state","status","property","stage","score"];
    const lines = [cols.join(",")].concat(rows.map((r) => cols.map((c) => `"${(r[c] ?? "").toString().replace(/"/g, '""')}"`).join(",")));
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `leatrack-${tab}.csv`; a.click();
    URL.revokeObjectURL(url); toast("Exported " + rows.length + " contacts");
  };

  const parseCsv = (text) => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return [];
    const splitRow = (line) => line.match(/(".*?"|[^,]+)(?=,|$)/g)?.map((v) => v.replace(/^"|"$/g, "").replace(/""/g, '"').trim()) || [];
    const cols = splitRow(lines[0]).map((c) => c.toLowerCase());
    return lines.slice(1).map((line) => {
      const vals = splitRow(line);
      const row = {};
      cols.forEach((c, i) => { row[c] = vals[i] ?? ""; });
      return row;
    });
  };

  const importCsv = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseCsv(String(reader.result));
      const imported = parsed
        .filter((r) => r.first && r.last && r.email)
        .map((r) => ({
          first: r.first, last: r.last, email: r.email,
          city: r.city || "", state: r.state || "",
          status: r.status || "Imported",
          property: r.property || PROPERTIES[0],
          source: "CSV import", stage: tab,
          score: tab === "contact" ? 12 : tab === "enrich" ? 48 : 80,
          id: uid(), updated: new Date().toISOString(),
        }));
      if (imported.length === 0) { toast("No valid rows found (need first, last, email columns)"); return; }
      setData((d) => ({ ...d,
        contacts: [...imported, ...d.contacts],
        activity: [{ id: uid(), who: "You", verb: "imported", target: imported.length + " contacts", tail: "via CSV", when: new Date().toISOString() }, ...d.activity].slice(0, 8),
      }));
      toast(`Imported ${imported.length} contact${imported.length !== 1 ? "s" : ""}`);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const nextLabel = tab === "convert" ? "Graduate" : "Move to " + STAGE_META[{ contact: "enrich", enrich: "convert" }[tab]].label;

  return (
    <div className="content-inner view-anim">
      <div style={{ display: "flex", gap: 8, marginBottom: 18, background: "var(--surface)", padding: 6, borderRadius: 12, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", width: "fit-content" }}>
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => { setTab(t.id); setQ(""); }}
              style={{ display: "flex", alignItems: "center", gap: 9, border: "none", borderRadius: 8, padding: "9px 16px", cursor: "pointer",
                background: active ? STAGE_META[t.id].color : "transparent", color: active ? "#fff" : "var(--text-2)", transition: "background .15s" }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: active ? "#fff" : STAGE_META[t.id].color }}></span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{t.label}</span>
              <span className="tnum" style={{ fontSize: 12, fontWeight: 700, padding: "1px 8px", borderRadius: 99, background: active ? "rgba(255,255,255,.2)" : "#eef0f3" }}>{counts[t.id]}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <SearchInput value={q} onChange={setQ} />
        <div style={{ flex: 1 }}></div>
        <input ref={fileRef} type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={importCsv} />
        <button className="btn btn-ghost btn-sm" onClick={() => fileRef.current?.click()}><Icons.Upload size={16} /> Import CSV</button>
        <button className="btn btn-ghost btn-sm" onClick={exportCsv}><Icons.Download size={16} /> Export</button>
        <button className="btn btn-primary btn-sm" onClick={() => { setForm(blankContact(tab)); setAdding(true); }}><Icons.Plus size={16} /> Add contact</button>
      </div>

      <div className="card tbl-wrap scrollbar">
        <table className="tbl">
          <thead><tr>
            <th>Name</th><th>Email</th><th>Location</th><th>Status</th><th>Score</th><th>AI predicted</th><th style={{ textAlign: "right" }}>Action</th>
          </tr></thead>
          <tbody>
            {rows.map((c) => {
              const ai = enrichedById.get(c.id);
              const isDup = insights.dupIds.has(c.id);
              const ActionIcon = ai ? (ACTION_ICON[ai.action.icon] || Icons.Spark) : Icons.Spark;
              return (
                <tr key={c.id}>
                  <td>
                    <div className="person">
                      <Avatar first={c.first} last={c.last} />
                      <div style={{ lineHeight: 1.25 }}>
                        <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                          {c.first} {c.last}
                          {isDup && <span title="Possible duplicate" style={{ color: "var(--danger)", display: "inline-flex" }}><Icons.AlertTriangle size={13} /></span>}
                        </div>
                        <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{c.source}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-2)" }}>{c.email}</td>
                  <td style={{ color: "var(--text-2)", whiteSpace: "nowrap" }}>{c.city}, {c.state}</td>
                  <td><StatusPill status={c.status} /></td>
                  <td><ScoreBar score={c.score} /></td>
                  <td>
                    {ai && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <PredictionBadge prob={ai.prob} />
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "var(--text-3)" }}>
                          <ActionIcon size={12} /> {ai.action.label}
                        </span>
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => advance(c)} style={{ color: STAGE_META[tab].color, borderColor: STAGE_META[tab].color + "55" }}>
                      {nextLabel} <Icons.ArrowRight size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <div className="empty">No contacts in {STAGE_META[tab].label}{q ? ` matching "${q}"` : ""}.</div>}
      </div>
      <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--text-3)" }}>{rows.length} contact{rows.length !== 1 ? "s" : ""} in {STAGE_META[tab].label}</div>

      {adding && (
        <Modal title={`Add contact to ${STAGE_META[tab].label}`} onClose={() => setAdding(false)}
          footer={<><button className="btn btn-subtle" onClick={() => setAdding(false)}>Cancel</button><button className="btn btn-primary" onClick={save}><Icons.Plus size={16} /> Add contact</button></>}>
          <ContactForm value={form} onChange={setForm} />
        </Modal>
      )}
    </div>
  );
}
