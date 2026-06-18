// LEA Track — seed data + persistence helpers
(function () {
  const STORE_KEY = "leatrack.v1";

  const PROPERTIES = [
    "Maple Grove Estates",
    "Harbor View Condos",
    "Cedar Ridge Townhomes",
    "Sunset Bay Villas",
    "Downtown Lofts 360",
    "Willow Creek Homes",
  ];

  // Status values straight from the LEA Track user guide
  const STATUSES = ["Imported", "Not contacted", "Contacted", "Customer", "Closed"];

  // Pipeline stages — the core of LEA Track
  const STAGES = ["contact", "enrich", "convert"];

  const SOURCES = ["Web form", "Open house", "Referral", "Social media", "Zillow", "Cold list"];

  const FIRST = ["Olivia","Liam","Emma","Noah","Ava","Ethan","Sophia","Mason","Isabella","Lucas",
    "Mia","Logan","Amelia","Jackson","Harper","Aiden","Evelyn","Carter","Abigail","Grayson",
    "Priya","Diego","Mei","Omar","Fatima","Ravi","Yuki","Sofia","Andre","Nadia"];
  const LAST = ["Bennett","Carter","Diaz","Flores","Greene","Harper","Ito","Jensen","Kowalski","Lambert",
    "Mercer","Nguyen","Owens","Patel","Quinn","Reyes","Sato","Turner","Underwood","Vasquez",
    "Whitman","Xu","Young","Zimmer","Acosta","Bauer","Cho","Donnelly"];
  const CITIES = [
    ["Austin","TX"],["Denver","CO"],["Seattle","WA"],["Miami","FL"],["Portland","OR"],
    ["Phoenix","AZ"],["Nashville","TN"],["Raleigh","NC"],["Tampa","FL"],["Boise","ID"],
    ["Madison","WI"],["Reno","NV"],["Boulder","CO"],["Tucson","AZ"],["Eugene","OR"],
  ];

  function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function uid() { return Math.random().toString(36).slice(2, 9); }

  function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString();
  }

  function makeContact(stage, i) {
    const f = rnd(FIRST), l = rnd(LAST), [city, state] = rnd(CITIES);
    // score: contact low, enrich mid, convert high
    const base = stage === "contact" ? 10 : stage === "enrich" ? 45 : 78;
    const score = Math.min(99, base + Math.floor(Math.random() * 21));
    let status;
    if (stage === "contact") status = rnd(["Imported", "Not contacted", "Not contacted", "Contacted"]);
    else if (stage === "enrich") status = rnd(["Contacted", "Contacted", "Customer"]);
    else status = rnd(["Customer", "Customer", "Closed"]);
    return {
      id: uid(),
      first: f,
      last: l,
      email: `${f.toLowerCase()}.${l.toLowerCase()}@${rnd(["gmail.com","outlook.com","proton.me","yahoo.com"])}`,
      phone: `(${200 + Math.floor(Math.random()*700)}) ${100+Math.floor(Math.random()*899)}-${1000+Math.floor(Math.random()*8999)}`,
      city, state,
      status,
      property: rnd(PROPERTIES),
      source: rnd(SOURCES),
      stage,
      score,
      updated: daysAgo(Math.floor(Math.random() * 30)),
    };
  }

  function seed() {
    const contacts = [];
    for (let i = 0; i < 22; i++) contacts.push(makeContact("contact", i));
    for (let i = 0; i < 13; i++) contacts.push(makeContact("enrich", i));
    for (let i = 0; i < 9; i++) contacts.push(makeContact("convert", i));

    // Leads = graduated convert-stage contacts (qualified, handed to sales)
    const leads = [];
    for (let i = 0; i < 11; i++) {
      const c = makeContact("convert", i);
      c.status = rnd(["Customer", "Customer", "Closed", "Contacted"]);
      leads.push(c);
    }

    const users = [
      { id: uid(), name: "s.ravikumar", email: "shruthi@leatrack.io", role: "Admin", status: "Active" },
      { id: uid(), name: "m.flores", email: "marco@leatrack.io", role: "Sales", status: "Active" },
      { id: uid(), name: "j.okafor", email: "jane@leatrack.io", role: "Marketing", status: "Active" },
      { id: uid(), name: "d.park", email: "david@leatrack.io", role: "Sales", status: "Inactive" },
      { id: uid(), name: "a.silva", email: "ana@leatrack.io", role: "Marketing", status: "Active" },
    ];

    return { contacts, leads, users, activity: defaultActivity(contacts) };
  }

  function defaultActivity(contacts) {
    const out = [];
    const verbs = [
      ["added", "to Contact"],
      ["enriched", "— interest rising"],
      ["moved", "to Convert"],
      ["emailed", "open-house invite"],
      ["called", "left voicemail"],
    ];
    for (let i = 0; i < 6; i++) {
      const c = rnd(contacts);
      const [v, tail] = rnd(verbs);
      out.push({ id: uid(), who: rnd(["Marco","Jane","Ana","You"]), verb: v, target: `${c.first} ${c.last}`, tail, when: daysAgo(i) });
    }
    return out;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const data = seed();
    save(data);
    return data;
  }

  function save(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function reset() {
    const data = seed();
    save(data);
    return data;
  }

  window.LeaData = {
    PROPERTIES, STATUSES, STAGES, SOURCES,
    load, save, reset, uid, makeContact,
    STAGE_LABEL: { contact: "Contact", enrich: "Enrich", convert: "Convert" },
  };
})();
