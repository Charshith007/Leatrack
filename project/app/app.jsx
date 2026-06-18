// LEA Track — app shell, routing, persistence
const { useState: aS, useEffect: aE } = React;

const ROUTE_META = {
  dashboard: { title: "Dashboard", sub: "A live summary of every lead across all properties" },
  contacts: { title: "Contact Manager", sub: "Move people through Contact → Enrich → Convert" },
  leads: { title: "Lead Manager", sub: "Qualified leads, ready for the sales team" },
  users: { title: "User Manager", sub: "Who has access to the LEA Track workspace" },
};

function App() {
  const [authed, setAuthed] = aS(false);
  const [route, setRoute] = aS("dashboard");
  const [collapsed, setCollapsed] = aS(false);
  const [data, setData] = aS(() => LeaData.load());
  const [toast, toastNode] = useToasts();

  // persist on every change
  aE(() => { LeaData.save(data); }, [data]);

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
              onClick={() => { const fresh = LeaData.reset(); setData(fresh); toast("Demo data reset"); }}>
              Reset data
            </button>
          } />
        <div className="content scrollbar">
          {route === "dashboard" && <Dashboard data={data} onNav={setRoute} />}
          {route === "contacts" && <ContactManager data={data} setData={setData} toast={toast} />}
          {route === "leads" && <LeadManager data={data} setData={setData} toast={toast} />}
          {route === "users" && <UserManager data={data} setData={setData} toast={toast} />}
        </div>
      </div>
      {toastNode}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
