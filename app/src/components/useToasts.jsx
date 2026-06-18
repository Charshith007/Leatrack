import { useState } from "react";
import { Icons } from "../icons.jsx";
import { uid } from "../lib/data.js";

export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = (msg) => {
    const id = uid();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };
  const node = (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div className="toast" key={t.id}><Icons.Check size={15} stroke={2.5} />{t.msg}</div>
      ))}
    </div>
  );
  return [push, node];
}
