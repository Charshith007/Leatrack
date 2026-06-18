import { useState } from "react";
import { Icons } from "../icons.jsx";
import { LivePipeline } from "./LivePipeline.jsx";

export function Login({ onLogin }) {
  const [user, setUser] = useState("s.ravikumar");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!user.trim() || !pass.trim()) { setErr("Username and password are required."); return; }
    onLogin(user.trim());
  };

  return (
    <div style={{ height: "100%", display: "grid", gridTemplateColumns: "1.05fr .95fr" }}>
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
