import { Reveal } from "./Reveal.jsx";
import { Frame } from "./Frame.jsx";

const ROWS = [
  { i: "DA", c: "#2d6a4f", nm: "Diego Acosta", email: "diego.a@email.com", city: "Austin", state: "TX", status: "Customer", sc: "#18996a", prop: "Maple Grove" },
  { i: "FP", c: "#40916c", nm: "Fatima Patel", email: "fatima.p@email.com", city: "Denver", state: "CO", status: "Closed", sc: "#6b4ee0", prop: "Harbor View" },
  { i: "RY", c: "#74c69d", nm: "Ravi Young", email: "ravi.y@email.com", city: "Seattle", state: "WA", status: "Customer", sc: "#18996a", prop: "Cedar Ridge" },
  { i: "MN", c: "#95d5b2", nm: "Mei Nguyen", email: "mei.n@email.com", city: "Portland", state: "OR", status: "Contacted", sc: "#3b6fe0", prop: "Sunset Bay" },
  { i: "OW", c: "#2d6a4f", nm: "Omar Whitman", email: "omar.w@email.com", city: "Tampa", state: "FL", status: "Customer", sc: "#18996a", prop: "Downtown Lofts" },
];

const CALLOUTS = ["Filter by name", "Sort any column A–Z", "Status at a glance", "Grouped by property"];

export function Showcase() {
  return (
    <section className="showcase">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>All your leads. One screen. Zero confusion.</h2>
          <p>The Lead Manager gives Sales a single, sortable view of every qualified lead — name, email, location, status, and property.</p>
        </Reveal>
        <Reveal as="div">
          <Frame url="app.leatrack.io/leads" bodyStyle={{ padding: 22 }}>
            <div className="mk-head"><span className="mk-title" style={{ fontSize: 15 }}>Lead Manager</span><span className="mk-chip">11 qualified leads</span></div>
            <table className="mk-tbl" style={{ fontSize: 13 }}>
              <thead><tr><th>Name</th><th className="hide-sm">Email</th><th className="hide-sm">City</th><th>State</th><th>Status</th><th>Property</th></tr></thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.nm}>
                    <td><div className="mk-name"><span className="mk-av" style={{ background: r.c }}>{r.i}</span><span className="nm">{r.nm}</span></div></td>
                    <td className="hide-sm">{r.email}</td>
                    <td className="hide-sm">{r.city}</td>
                    <td>{r.state}</td>
                    <td><span className="mk-status" style={{ color: r.sc }}><span className="sd" style={{ background: r.sc }} />{r.status}</span></td>
                    <td>{r.prop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Frame>
        </Reveal>
        <Reveal as="div" className="callouts">
          {CALLOUTS.map((c, i) => (
            <span className="callout" key={c}><span className="n">{i + 1}</span>{c}</span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
