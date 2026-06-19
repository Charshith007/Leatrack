import { useState, useRef, useEffect } from "react";
import { Icons } from "../icons.jsx";
import { buildInsights } from "../lib/ai.js";

const QUICK = [
  "How many leads do I have?",
  "Who should I contact today?",
  "What's my conversion rate?",
  "What are the pipeline stages?",
];

function answer(question, data) {
  const q = question.toLowerCase();
  const insights = buildInsights(data.contacts);

  if (/(how many|count).*lead/.test(q) || /lead.*count/.test(q)) {
    return `You have ${data.leads.length} qualified leads in Lead Manager, plus ${data.contacts.length} contacts still moving through the pipeline.`;
  }
  if (/who should i (contact|call|email)|contact today|next action/.test(q)) {
    const top = insights.top[0];
    if (!top) return "There are no contacts yet — add one in Contact Manager to get a recommendation.";
    return `Start with ${top.first} ${top.last} — predicted ${top.prob}% to convert. Recommended action: ${top.action.label}.`;
  }
  if (/conversion rate|convert%|how am i (doing|trending)/.test(q)) {
    const total = data.contacts.length || 1;
    const converting = data.contacts.filter((c) => c.stage === "convert").length;
    return `${Math.round((converting / total) * 100)}% of active contacts are in the Convert stage. Average predicted conversion likelihood across all contacts is ${insights.avgProb}%.`;
  }
  if (/stage|pipeline|funnel/.test(q)) {
    return "LEA Track has three pipeline stages: Contact (raw interest), Enrich (nurturing), and Convert (ready for sales). Contacts graduate from Convert into Lead Manager.";
  }
  if (/duplicate/.test(q)) {
    const n = insights.dupGroups.length;
    return n ? `I found ${n} possible duplicate group${n !== 1 ? "s" : ""} by matching email or name + city. Check the AI Insights page for details.` : "No likely duplicates detected right now.";
  }
  if (/score|scoring/.test(q)) {
    return "Lead score (0–99) blends pipeline stage, recency, and source quality. It feeds the AI conversion prediction shown next to each contact.";
  }
  if (/segment|persona|cluster/.test(q)) {
    return "Contacts are clustered into five segments — Hot mover, Steady riser, New spark, Re-engage, and Slow burner — based on predicted conversion likelihood and recency. See AI Insights for the breakdown.";
  }
  if (/hi|hello|hey/.test(q)) {
    return "Hi! I'm the LEA Track assistant. Ask me about your leads, pipeline, or scoring.";
  }
  return "I can help with leads, pipeline stages, scoring, segments, and duplicate detection — try one of the quick questions below.";
}

export function AIChatWidget({ data }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, I'm the LEA Track assistant. Ask me anything about your leads or pipeline." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, open]);

  const send = (text) => {
    const t = text.trim();
    if (!t) return;
    const reply = answer(t, data);
    setMessages((m) => [...m, { from: "user", text: t }, { from: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", right: 22, bottom: 22, zIndex: 90, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      {open && (
        <div className="card" style={{ width: 320, height: 420, display: "flex", flexDirection: "column", boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--border)", background: "var(--ink)", color: "#fff" }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: "var(--rocket)", display: "grid", placeItems: "center", flex: "none" }}><Icons.Bot size={16} /></span>
            <div style={{ flex: 1, lineHeight: 1.2 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>AI Assistant</div>
              <div style={{ fontSize: 11, color: "#aeb6c4" }}>Lead support &amp; FAQs</div>
            </div>
            <button className="icon-btn" style={{ color: "#cdd3de", width: 28, height: 28 }} onClick={() => setOpen(false)}><Icons.X size={16} /></button>
          </div>
          <div ref={scrollRef} style={{ flex: 1, overflow: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, background: "var(--surface-2)" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}>
                <div style={{
                  padding: "9px 12px", borderRadius: 12, fontSize: 13, lineHeight: 1.4,
                  background: m.from === "user" ? "var(--rocket)" : "var(--surface)",
                  color: m.from === "user" ? "#fff" : "var(--text)",
                  border: m.from === "user" ? "none" : "1px solid var(--border)",
                }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: 10, borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: 6 }}>
            {QUICK.map((q) => (
              <button key={q} className="btn btn-subtle btn-sm" style={{ fontSize: 11.5, height: 26, padding: "0 9px" }} onClick={() => send(q)}>{q}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid var(--border)" }}>
            <input className="input" style={{ height: 36 }} placeholder="Ask about your leads..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="icon-btn" type="submit" style={{ background: "var(--rocket)", color: "#fff" }}><Icons.Send size={16} /></button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} className="card card-hover"
        style={{ width: 52, height: 52, borderRadius: 26, display: "grid", placeItems: "center", background: "var(--ink)", color: "#fff", border: "none" }}
        title="AI Assistant">
        {open ? <Icons.X size={20} /> : <Icons.Bot size={22} />}
      </button>
    </div>
  );
}
