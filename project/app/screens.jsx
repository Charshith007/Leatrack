// LEA Track — screens
const { useState: uS, useMemo: uM } = React;

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

/* ============================ LIVE PIPELINE (login showcase) ============================ */
const LIVE_LEADS = [
  { first: "Olivia", last: "Bennett", src: "Web form" },
  { first: "Diego", last: "Acosta", src: "Open house" },
  { first: "Mei", last: "Nguyen", src: "Referral" },
  { first: "Omar", last: "Whitman", src: "Zillow" },
];
const LIVE_STAGES = [
  { key: "contact", label: "Contact", color: "#5b8def", count: 128, score: 14 },
  { key: "enrich", label: "Enrich", color: "#f0a93a", count: 79, score: 53 },
  { key: "convert", label: "Convert", color: "#2fc28a", count: 43, score: 91 },
];

function LivePipeline() {
  const [stage, setStage] = uS(0);
  const [lead, setLead] = uS(0);
  const [converted, setConverted] = uS(43);
  React.useEffect(() => {
    const t = setInterval(() => {
      setStage((s) => {
        if (s === 2) { setLead((l) => (l + 1) % LIVE_LEADS.length); setConverted((c) => c + 1); return 0; }
        return s + 1;
      });
    }, 1900);
    return () => clearInterval(t);
  }, []);
  const L = LIVE_LEADS[lead];
  const st = LIVE_STAGES[stage];

  return (
    <div style={{ position: "relative", borderRadius: 16, padding: 18, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", boxShadow: "0 20px 50px -24px rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: "#2fc28a", animation: "liveDot 2s infinite" }}></span>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", letterSpacing: ".02em" }}>Live pipeline</span>
        <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 600, color: "#7d869a" }}>Updated just now</span>
      </div>

      {/* stage rail */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        {LIVE_STAGES.map((s, i) => {
          const active = stage === i;
          return (
            <div key={s.key} style={{ borderRadius: 11, padding: "10px 11px", background: active ? s.color + "26" : "rgba(255,255,255,.03)", border: `1px solid ${active ? s.color : "rgba(255,255,255,.08)"}`, transition: "background .4s, border-color .4s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: s.color }}></span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: active ? "#fff" : "#aeb6c4" }}>{s.label}</span>
              </div>
              <div className="tnum mono" style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{i === 2 ? converted : s.count}</div>
              <div style={{ fontSize: 10, color: "#7d869a", fontWeight: 600, marginTop: 2 }}>leads</div>
            </div>
          );
        })}
      </div>

      {/* the moving lead */}
      <div key={stage + "-" + lead} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 12px", borderRadius: 11, background: "rgba(255,255,255,.05)", border: `1px solid ${st.color}55`, animation: "chipPop .4s ease" }}>
        <Avatar first={L.first} last={L.last} size={36} />
        <div style={{ lineHeight: 1.25, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: "#fff", whiteSpace: "nowrap" }}>{L.first} {L.last}</div>
          <div style={{ fontSize: 11, color: "#7d869a" }}>{L.src}</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>
            <div style={{ width: 52, height: 6, borderRadius: 99, background: "rgba(255,255,255,.12)", overflow: "hidden" }}>
              <span style={{ display: "block", height: "100%", width: st.score + "%", background: st.color, borderRadius: 99, transition: "width .5s ease" }}></span>
            </div>
            <span className="tnum mono" style={{ fontSize: 13, fontWeight: 700, color: st.color, minWidth: 20 }}>{st.score}</span>
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: "#7d869a", marginTop: 3 }}>{stage === 0 ? "Captured" : stage === 1 ? "Nurturing →" : "Sent to Sales ✓"}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================ LOGIN ============================ */
function Login({ onLogin }) {
  const [user, setUser] = uS("s.ravikumar");
  const [pass, setPass] = uS("");
  const [show, setShow] = uS(false);
  const [err, setErr] = uS("");

  const submit = (e) => {
    e.preventDefault();
    if (!user.trim() || !pass.trim()) { setErr("Username and password are required."); return; }
    onLogin(user.trim());
  };

  return (
    <div style={{ height: "100%", display: "grid", gridTemplateColumns: "1.05fr .95fr" }}>
      {/* Brand panel */}
      <div style={{ background: "var(--ink)", color: "#fff", padding: "52px 56px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(241,90,43,.28), transparent 62%)", right: -160, top: -150 }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: 11, position: "relative" }}>
          <span style={{ width: 38, height: 38, borderRadius: 10, background: "var(--rocket)", display: "grid", placeItems: "center", boxShadow: "0 4px 14px rgba(225,90,43,.5)" }}><Icons.Rocket size={21} /></span>
          <span className="mono" style={{ fontWeight: 700, fontSize: 20 }}>LEA Track</span>
        </div>
        <div style={{ position: "relative", maxWidth: 440 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, color: "var(--rocket)", letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 14 }}>
            <span style={{ width: 16, height: 2, background: "var(--rocket)", borderRadius: 2 }}></span>Contact · Enrich · Convert
          </span>
          <h2 style={{ fontSize: 36, lineHeight: 1.08, fontWeight: 800, letterSpacing: "-.025em", margin: "0 0 14px" }}>Watch interest<br />become revenue.</h2>
          <p style={{ color: "#aeb6c4", fontSize: 15, lineHeight: 1.55, margin: "0 0 26px" }}>Every lead, one pipeline, zero leaks — your whole team always knows the next move.</p>
          <LivePipeline />
        </div>
        <div style={{ position: "relative", fontSize: 12, color: "#5b6479" }}>Lead Management System · v1.0</div>
      </div>

      {/* Form panel */}
      <div style={{ display: "grid", placeItems: "center", padding: 32, background: "var(--surface)" }}>
        <form onSubmit={submit} style={{ width: "100%", maxWidth: 360 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>Log in</h1>
          <p style={{ color: "var(--text-3)", margin: "0 0 26px", fontSize: 14 }}>Enter your credentials to access your workspace.</p>

          <div className="field" style={{ marginBottom: 16 }}>
            <label>Username<span className="req">*</span></label>
            <input className="input" value={user} onChange={(e) => { setUser(e.target.value); setErr(""); }} placeholder="your.username" autoFocus />
          </div>
          <div className="field" style={{ marginBottom: 8 }}>
            <label>Password<span className="req">*</span></label>
            <div style={{ position: "relative" }}>
              <input className="input" type={show ? "text" : "password"} value={pass} onChange={(e) => { setPass(e.target.value); setErr(""); }} placeholder="••••••••" style={{ paddingRight: 42 }} />
              <button type="button" onClick={() => setShow((s) => !s)} className="icon-btn" style={{ position: "absolute", right: 3, top: 2, height: 36, width: 36 }} title={show ? "Hide" : "Show"}>
                {show ? <Icons.EyeOff size={17} /> : <Icons.Eye size={17} />}
              </button>
            </div>
          </div>
          {err && <div style={{ color: "var(--danger)", fontSize: 12.5, fontWeight: 600, marginBottom: 8 }}>{err}</div>}
          <div style={{ textAlign: "right", marginBottom: 18 }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12.5, fontWeight: 600, color: "var(--rocket)", textDecoration: "none" }}>Forgot? Contact us to reset</a>
          </div>
          <button className="btn btn-primary" type="submit" style={{ width: "100%", height: 44, fontSize: 15, justifyContent: "center" }}>
            Log in <Icons.ArrowRight size={17} />
          </button>
          <p style={{ textAlign: "center", color: "var(--text-3)", fontSize: 12, marginTop: 18 }}>Any username & password works in this demo.</p>
        </form>
      </div>
    </div>
  );
}

/* ============================ DASHBOARD ============================ */
function Dashboard({ data, onNav }) {
  const { contacts, leads, activity } = data;
  const byStage = (s) => contacts.filter((c) => c.stage === s).length;

  const propStats = uM(() => {
    const map = {};
    contacts.forEach((c) => { map[c.property] = (map[c.property] || 0) + 1; });
    const palette = ["#f15a2b","#3b6fe0","#18996a","#9a5bd6","#d6a000","#0fa3b1"];
    return LeaData.PROPERTIES.map((p, i) => ({ label: p, value: map[p] || 0, color: palette[i % palette.length] }))
      .filter((d) => d.value > 0).sort((a, b) => b.value - a.value);
  }, [contacts]);

  const total = contacts.length;
  const convRate = total ? Math.round((byStage("convert") / total) * 100) : 0;

  const FunnelRow = ({ stage }) => {
    const m = STAGE_META[stage]; const n = byStage(stage);
    const pct = total ? Math.round((n / total) * 100) : 0;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13.5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: m.color }}></span>{m.label}
            <span style={{ color: "var(--text-3)", fontWeight: 500 }}>· {m.desc}</span>
          </span>
          <span className="tnum mono" style={{ fontWeight: 700, fontSize: 14 }}>{n}<span style={{ color: "var(--text-3)", fontWeight: 600, fontSize: 12 }}> · {pct}%</span></span>
        </div>
        <div style={{ height: 9, borderRadius: 99, background: "#eef0f3", overflow: "hidden" }}>
          <div style={{ width: pct + "%", height: "100%", background: m.color, borderRadius: 99, transition: "width .5s ease" }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="content-inner view-anim">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard label="Total leads" value={total} sub="Across all properties" accent="var(--rocket)" icon={Icons.Contacts} />
        <StatCard label="In Contact" value={byStage("contact")} sub="Raw interest" accent="var(--contact)" icon={Icons.Dot} />
        <StatCard label="In Enrich" value={byStage("enrich")} sub="Being nurtured" accent="var(--enrich)" icon={Icons.Spark} />
        <StatCard label="Conversion rate" value={convRate + "%"} sub={byStage("convert") + " ready for sales"} accent="var(--convert)" icon={Icons.Trend} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)", gap: 16, marginBottom: 16 }}>
        {/* Donut by property */}
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Leads by property</h3>
            <button className="btn btn-subtle btn-sm" onClick={() => onNav("contacts")}>View all <Icons.ChevronRight size={15} /></button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <Donut data={propStats} total={total} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {propStats.map((p) => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: p.color, flex: "none" }}></span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.label}</span>
                  <span className="tnum mono" style={{ fontSize: 13, fontWeight: 700 }}>{p.value}</span>
                  <span className="tnum" style={{ fontSize: 11.5, color: "var(--text-3)", minWidth: 34, textAlign: "right" }}>{Math.round((p.value / (total || 1)) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Funnel */}
        <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Pipeline stages</h3>
          <FunnelRow stage="contact" />
          <FunnelRow stage="enrich" />
          <FunnelRow stage="convert" />
          <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: "var(--rocket-50)", color: "var(--rocket)", display: "grid", placeItems: "center" }}><Icons.Leads size={16} /></span>
            <span style={{ fontSize: 13, color: "var(--text-2)" }}><b style={{ color: "var(--text)" }}>{leads.length} qualified leads</b> handed to sales</span>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="card" style={{ padding: 22 }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Recent activity</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {activity.map((a, i) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--rocket)", flex: "none" }}></span>
              <span style={{ fontSize: 13.5, flex: 1 }}><b>{a.who}</b> {a.verb} <b>{a.target}</b> {a.tail}</span>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>{fmtDate(a.when)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ CONTACT FORM (shared) ============================ */
function ContactForm({ value, onChange, withStatus = true }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="grid2">
        <div className="field"><label>First name<span className="req">*</span></label>
          <input className="input" value={value.first} onChange={(e) => set("first", e.target.value)} placeholder="Olivia" /></div>
        <div className="field"><label>Last name<span className="req">*</span></label>
          <input className="input" value={value.last} onChange={(e) => set("last", e.target.value)} placeholder="Bennett" /></div>
      </div>
      <div className="field"><label>Email<span className="req">*</span></label>
        <input className="input" type="email" value={value.email} onChange={(e) => set("email", e.target.value)} placeholder="olivia@email.com" /></div>
      <div className="grid2">
        <div className="field"><label>City</label>
          <input className="input" value={value.city} onChange={(e) => set("city", e.target.value)} placeholder="Austin" /></div>
        <div className="field"><label>State</label>
          <select className="select" value={value.state} onChange={(e) => set("state", e.target.value)}>
            <option value="">Select…</option>
            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select></div>
      </div>
      <div className={withStatus ? "grid2" : ""}>
        <div className="field"><label>Property</label>
          <select className="select" value={value.property} onChange={(e) => set("property", e.target.value)}>
            {LeaData.PROPERTIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select></div>
        {withStatus && (
          <div className="field"><label>Status</label>
            <select className="select" value={value.status} onChange={(e) => set("status", e.target.value)}>
              {LeaData.STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select></div>
        )}
      </div>
    </div>
  );
}

function blankContact(stage) {
  return { first: "", last: "", email: "", city: "", state: "", property: LeaData.PROPERTIES[0], status: "Imported", source: "Manual", stage: stage || "contact" };
}

/* ============================ CONTACT MANAGER ============================ */
function ContactManager({ data, setData, toast }) {
  const [tab, setTab] = uS("contact");
  const [q, setQ] = uS("");
  const [adding, setAdding] = uS(false);
  const [form, setForm] = uS(blankContact("contact"));

  const tabs = [
    { id: "contact", label: "Contact", desc: "Raw interest" },
    { id: "enrich", label: "Enrich", desc: "Building interest" },
    { id: "convert", label: "Convert", desc: "Hand to sales" },
  ];

  const rows = uM(() => {
    const ql = q.trim().toLowerCase();
    return data.contacts.filter((c) => c.stage === tab)
      .filter((c) => !ql || (c.first + " " + c.last).toLowerCase().includes(ql) || c.email.toLowerCase().includes(ql))
      .sort((a, b) => b.score - a.score);
  }, [data.contacts, tab, q]);

  const counts = { contact: 0, enrich: 0, convert: 0 };
  data.contacts.forEach((c) => counts[c.stage]++);

  const advance = (c) => {
    const order = ["contact", "enrich", "convert"];
    const idx = order.indexOf(c.stage);
    if (c.stage === "convert") {
      // graduate to Lead Manager
      setData((d) => ({
        ...d,
        contacts: d.contacts.filter((x) => x.id !== c.id),
        leads: [{ ...c, status: "Customer", updated: new Date().toISOString() }, ...d.leads],
        activity: [{ id: LeaData.uid(), who: "You", verb: "graduated", target: c.first + " " + c.last, tail: "to Lead Manager", when: new Date().toISOString() }, ...d.activity].slice(0, 8),
      }));
      toast(`${c.first} graduated to Lead Manager`);
      return;
    }
    const next = order[idx + 1];
    setData((d) => ({
      ...d,
      contacts: d.contacts.map((x) => x.id === c.id ? { ...x, stage: next, score: Math.min(99, x.score + 22), status: next === "enrich" ? "Contacted" : "Customer", updated: new Date().toISOString() } : x),
      activity: [{ id: LeaData.uid(), who: "You", verb: "moved", target: c.first + " " + c.last, tail: "to " + STAGE_META[next].label, when: new Date().toISOString() }, ...d.activity].slice(0, 8),
    }));
    toast(`${c.first} moved to ${STAGE_META[next].label}`);
  };

  const save = () => {
    if (!form.first.trim() || !form.last.trim() || !form.email.trim()) { toast("First, last and email are required"); return; }
    const c = { ...form, id: LeaData.uid(), stage: tab, score: tab === "contact" ? 12 : tab === "enrich" ? 48 : 80, updated: new Date().toISOString() };
    setData((d) => ({ ...d,
      contacts: [c, ...d.contacts],
      activity: [{ id: LeaData.uid(), who: "You", verb: "added", target: c.first + " " + c.last, tail: "to " + STAGE_META[tab].label, when: new Date().toISOString() }, ...d.activity].slice(0, 8),
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

  const nextLabel = tab === "convert" ? "Graduate" : "Move to " + STAGE_META[{ contact: "enrich", enrich: "convert" }[tab]].label;

  return (
    <div className="content-inner view-anim">
      {/* Tabs */}
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

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <SearchInput value={q} onChange={setQ} />
        <div style={{ flex: 1 }}></div>
        <button className="btn btn-ghost btn-sm" onClick={() => toast("Upload: choose a CSV, photo, or file")}><Icons.Upload size={16} /> Upload file</button>
        <button className="btn btn-ghost btn-sm" onClick={exportCsv}><Icons.Download size={16} /> Export</button>
        <button className="btn btn-primary btn-sm" onClick={() => { setForm(blankContact(tab)); setAdding(true); }}><Icons.Plus size={16} /> Add contact</button>
      </div>

      {/* Table */}
      <div className="card tbl-wrap scrollbar">
        <table className="tbl">
          <thead><tr>
            <th>Name</th><th>Email</th><th>Location</th><th>Status</th><th>Property</th><th>Score</th><th style={{ textAlign: "right" }}>Action</th>
          </tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td><div className="person"><Avatar first={c.first} last={c.last} /><div style={{ lineHeight: 1.25 }}><div style={{ fontWeight: 700 }}>{c.first} {c.last}</div><div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{c.source}</div></div></div></td>
                <td style={{ color: "var(--text-2)" }}>{c.email}</td>
                <td style={{ color: "var(--text-2)", whiteSpace: "nowrap" }}>{c.city}, {c.state}</td>
                <td><StatusPill status={c.status} /></td>
                <td style={{ color: "var(--text-2)", whiteSpace: "nowrap" }}>{c.property}</td>
                <td><ScoreBar score={c.score} /></td>
                <td style={{ textAlign: "right" }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => advance(c)} style={{ color: STAGE_META[tab].color, borderColor: STAGE_META[tab].color + "55" }}>
                    {nextLabel} <Icons.ArrowRight size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="empty">No contacts in {STAGE_META[tab].label}{q ? ` matching “${q}”` : ""}.</div>}
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

/* ============================ LEAD MANAGER ============================ */
function LeadManager({ data, setData, toast }) {
  const [q, setQ] = uS("");
  const [sort, setSort] = uS({ key: "score", dir: "desc" });
  const [adding, setAdding] = uS(false);
  const [form, setForm] = uS(blankContact("convert"));

  const setSortKey = (key) => setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });

  const rows = uM(() => {
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
    const c = { ...form, id: LeaData.uid(), stage: "convert", score: 82, updated: new Date().toISOString() };
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
        {rows.length === 0 && <div className="empty">No qualified leads{q ? ` matching “${q}”` : " yet — graduate a contact from Convert"}.</div>}
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

/* ============================ USER MANAGER ============================ */
function UserManager({ data, setData, toast }) {
  const [adding, setAdding] = uS(false);
  const [show, setShow] = uS(false);
  const blank = { name: "", email: "", password: "", role: "Sales", status: "Active" };
  const [form, setForm] = uS(blank);

  const toggle = (id) => setData((d) => ({ ...d, users: d.users.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u) }));
  const del = (id) => { setData((d) => ({ ...d, users: d.users.filter((u) => u.id !== id) })); toast("User removed"); };

  const save = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) { toast("Username, email and password are required"); return; }
    setData((d) => ({ ...d, users: [{ ...form, id: LeaData.uid() }, ...d.users] }));
    setAdding(false); setForm(blank); toast("User added");
  };

  return (
    <div className="content-inner view-anim">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: "var(--text-2)" }}>Manage who has access to the LEA Track workspace.</span>
        <div style={{ flex: 1 }}></div>
        <button className="btn btn-primary btn-sm" onClick={() => { setForm(blank); setShow(false); setAdding(true); }}><Icons.Plus size={16} /> Add new user</button>
      </div>

      <div className="card tbl-wrap scrollbar">
        <table className="tbl">
          <thead><tr><th>User name</th><th>Email</th><th>Role</th><th>Status</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
          <tbody>
            {data.users.map((u) => (
              <tr key={u.id}>
                <td><div className="person"><Avatar first={u.name[0]} last={u.name.split(".")[1] || ""} size={30} /><span style={{ fontWeight: 700 }}>{u.name}</span></div></td>
                <td style={{ color: "var(--text-2)" }}>{u.email}</td>
                <td><span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-2)" }}>{u.role}</span></td>
                <td>
                  <button onClick={() => toggle(u.id)} title="Toggle active"
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "none", background: "transparent", cursor: "pointer", fontWeight: 600, fontSize: 12.5, color: u.status === "Active" ? "var(--convert)" : "var(--text-3)" }}>
                    <span style={{ width: 34, height: 20, borderRadius: 99, background: u.status === "Active" ? "var(--convert)" : "#cfd4dd", position: "relative", transition: "background .15s" }}>
                      <span style={{ position: "absolute", top: 2, left: u.status === "Active" ? 16 : 2, width: 16, height: 16, borderRadius: 99, background: "#fff", transition: "left .15s", boxShadow: "0 1px 2px rgba(0,0,0,.2)" }}></span>
                    </span>
                    {u.status}
                  </button>
                </td>
                <td style={{ textAlign: "right" }}><button className="icon-btn" onClick={() => del(u.id)} style={{ color: "var(--danger)" }} title="Remove user"><Icons.Trash size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {adding && (
        <Modal title="Add new user" onClose={() => setAdding(false)}
          footer={<><button className="btn btn-subtle" onClick={() => setAdding(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="field"><label>User name<span className="req">*</span></label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="j.smith" /></div>
            <div className="field"><label>Email<span className="req">*</span></label>
              <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="j.smith@leatrack.io" /></div>
            <div className="field"><label>Password<span className="req">*</span></label>
              <div style={{ position: "relative" }}>
                <input className="input" type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" style={{ paddingRight: 42 }} />
                <button type="button" className="icon-btn" onClick={() => setShow((s) => !s)} style={{ position: "absolute", right: 3, top: 2, height: 36, width: 36 }}>{show ? <Icons.EyeOff size={17} /> : <Icons.Eye size={17} />}</button>
              </div></div>
            <div className="grid2">
              <div className="field"><label>Role</label>
                <select className="select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option>Admin</option><option>Sales</option><option>Marketing</option></select></div>
              <div className="field"><label>Status</label>
                <select className="select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></select></div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

Object.assign(window, { Login, Dashboard, ContactManager, LeadManager, UserManager });
