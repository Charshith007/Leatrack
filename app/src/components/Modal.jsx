import { useEffect } from "react";
import { Icons } from "../icons.jsx";

export function Modal({ title, children, onClose, footer }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal scrollbar" role="dialog" aria-modal="true">
        <div className="modal-head">
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h2>
          <button className="icon-btn" onClick={onClose}><Icons.X size={18} /></button>
        </div>
        <div className="modal-body scrollbar">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
