import { useState, useMemo } from "react";
import { Icons } from "../icons.jsx";
import { uid } from "../lib/data.js";
import { Avatar } from "../components/Avatar.jsx";
import { StatusPill } from "../components/Badges.jsx";
import { SearchInput } from "../components/SearchInput.jsx";
import { Modal } from "../components/Modal.jsx";
import { ContactForm, blankContact } from "./ContactForm.jsx";

export function LeadManager({ data, setData, toast }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState({ key: "score", dir: "desc" });
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blankContact("convert"));

  const setSortKey = (key) => setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });

  const rows = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let r = data.leads.filter((c) => !ql || (c.first + " " + c.last).toLowerCase().includes(ql) || c.email.toLowerCase().includes(ql));
    const { key, dir } = sort;
    r = [...r].sort((a, b) => {
      let av = a[key], bv = b[key];
      if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      return (av < bv ? -1 : av > bv ? 1 : 0) * (dir === "asc" ? 1 : -1);
    });
    return r;
  }, [data.leads, q, sort]);

  const del = (id) => { setData((d) => ({ ...d, leads: d.leads.filter((x) => x.id !== id) })); toast("Lead deleted"); };

  const save = () => {
    if (!form.first.trim() || !form.last.trim() || !form.email.trim()) { toast("First, last and email are required"); return; }
    const c = { ...form, id: uid(), stage: "convert", score: 82, updated: new Date().toISOString() };
    setData((d) => ({ ...d, leads: [c, ...d.leads] }));
    setAdding(false); setForm(blankContact("convert")); toast("Lead added");
  };

  const Th = ({ k, children, right }) => (
    <th className="sortable" onClick={() => setSortKey(k)} style={right ? { textAlign: "right" } : null}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{children}
        {sort.key === k && <span style={{ color: "var(--rocket)" }}>{sort.dir === "asc" ? "↑" : "↓"}</span>}</span>
    </th>
  );

  return (
    <div className="content-inner view-anim">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <SearchInput value={q} onChange={setQ} />
        <span style={{ fontSize: 12.5, color: "var(--text-3)" }}><Icons.Sort size={13} style={{ verticalAlign: "-2px" }} /> Click a column to sort A–Z / Z–A</span>
        <div style={{ flex: 1 }}></div>
        <button className="btn btn-primary btn-sm" onClick={() => { setForm(blankContact("convert")); setAdding(true); }}><Icons.Plus size={16} /> Add new lead</button>
      </div>

      <div className="card tbl-wrap scrollbar">
        <table className="tbl">
          <thead><tr>
            <Th k="first">First name</Th><Th k="last">Last name</Th><Th k="email">Email</Th>
            <Th k="city">City</Th><Th k="state">State</Th><th>Status</th><th>Property</th><th style={{ textAlign: "right" }}>Action</th>
          </tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td><div className="person"><Avatar first={c.first} last={c.last} size={28} /><span style={{ fontWeight: 700 }}>{c.first}</span></div></td>
                <td style={{ fontWeight: 600 }}>{c.last}</td>
                <td style={{ color: "var(--text-2)" }}>{c.email}</td>
                <td style={{ color: "var(--text-2)" }}>{c.city}</td>
                <td style={{ color: "var(--text-2)" }}>{c.state}</td>
                <td><StatusPill status={c.status} /></td>
                <td style={{ color: "var(--text-2)", whiteSpace: "nowrap" }}>{c.property}</td>
                <td style={{ textAlign: "right" }}><button className="icon-btn" title="Delete lead" onClick={() => del(c.id)} style={{ color: "var(--danger)" }}><Icons.Trash size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="empty">No qualified leads{q ? ` matching "${q}"` : " yet — graduate a contact from Convert"}.</div>}
      </div>
      <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--text-3)" }}>{rows.length} qualified lead{rows.length !== 1 ? "s" : ""} ready for sales</div>

      {adding && (
        <Modal title="Add new lead" onClose={() => setAdding(false)}
          footer={<><button className="btn btn-danger" onClick={() => { setForm(blankContact("convert")); }}>Clear</button>
            <div style={{ display: "flex", gap: 10 }}><button className="btn btn-subtle" onClick={() => setAdding(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save lead</button></div></>}>
          <ContactForm value={form} onChange={setForm} />
        </Modal>
      )}
    </div>
  );
}
