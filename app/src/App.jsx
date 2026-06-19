import { useState, useEffect } from "react";
import { load, save, reset } from "./lib/data.js";
import { useToasts } from "./components/useToasts.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { Topbar } from "./components/Topbar.jsx";
import { Login } from "./screens/Login.jsx";
import { Dashboard } from "./screens/Dashboard.jsx";
import { ContactManager } from "./screens/ContactManager.jsx";
import { LeadManager } from "./screens/LeadManager.jsx";
import { UserManager } from "./screens/UserManager.jsx";
import { AIInsights } from "./screens/AIInsights.jsx";
import { AIChatWidget } from "./components/AIChatWidget.jsx";

const ROUTE_META = {
  dashboard: { title: "Dashboard", sub: "A live summary of every lead across all properties" },
  contacts: { title: "Contact Manager", sub: "Move people through Contact → Enrich → Convert" },
  leads: { title: "Lead Manager", sub: "Qualified leads, ready for the sales team" },
  users: { title: "User Manager", sub: "Who has access to the LEA Track workspace" },
  insights: { title: "AI Insights", sub: "Predicted conversions, segments and recommended actions" },
};

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [route, setRoute] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState(() => load());
  const [toast, toastNode] = useToasts();

  useEffect(() => { save(data); }, [data]);

  if (!authed) {
    return (<><Login onLogin={() => { setAuthed(true); setRoute("dashboard"); }} />{toastNode}</>);
  }

  const counts = {
    contacts: data.contacts.length,
    leads: data.leads.length,
  };

  const meta = ROUTE_META[route];

  return (
    <div className="shell">
      <Sidebar route={route} onNav={setRoute} collapsed={collapsed} counts={counts}
        onLogout={() => { setAuthed(false); }} />
      <div className="main">
        <Topbar title={meta.title} subtitle={meta.sub} onToggleSidebar={() => setCollapsed((c) => !c)}
          actions={
            <button className="btn btn-ghost btn-sm" title="Reset demo data"
              onClick={() => { const fresh = reset(); setData(fresh); toast("Demo data reset"); }}>
              Reset data
            </button>
          } />
        <div className="content scrollbar">
          {route === "dashboard" && <Dashboard data={data} onNav={setRoute} />}
          {route === "contacts" && <ContactManager data={data} setData={setData} toast={toast} />}
          {route === "leads" && <LeadManager data={data} setData={setData} toast={toast} />}
          {route === "users" && <UserManager data={data} setData={setData} toast={toast} />}
          {route === "insights" && <AIInsights data={data} onNav={setRoute} />}
        </div>
      </div>
      {toastNode}
      <AIChatWidget data={data} />
    </div>
  );
}
