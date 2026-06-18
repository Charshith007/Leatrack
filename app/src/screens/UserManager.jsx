import { useState } from "react";
import { Icons } from "../icons.jsx";
import { uid } from "../lib/data.js";
import { Avatar } from "../components/Avatar.jsx";
import { Modal } from "../components/Modal.jsx";

export function UserManager({ data, setData, toast }) {
  const [adding, setAdding] = useState(false);
  const [show, setShow] = useState(false);
  const blank = { name: "", email: "", password: "", role: "Sales", status: "Active" };
  const [form, setForm] = useState(blank);

  const toggle = (id) => setData((d) => ({ ...d, users: d.users.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u) }));
  const del = (id) => { setData((d) => ({ ...d, users: d.users.filter((u) => u.id !== id) })); toast("User removed"); };

  const save = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) { toast("Username, email and password are required"); return; }
    setData((d) => ({ ...d, users: [{ ...form, id: uid() }, ...d.users] }));
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
