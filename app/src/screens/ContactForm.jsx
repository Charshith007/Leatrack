import { PROPERTIES, STATUSES } from "../lib/data.js";

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

export function ContactForm({ value, onChange, withStatus = true }) {
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
            {PROPERTIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select></div>
        {withStatus && (
          <div className="field"><label>Status</label>
            <select className="select" value={value.status} onChange={(e) => set("status", e.target.value)}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select></div>
        )}
      </div>
    </div>
  );
}

export function blankContact(stage) {
  return { first: "", last: "", email: "", city: "", state: "", property: PROPERTIES[0], status: "Imported", source: "Manual", stage: stage || "contact" };
}
