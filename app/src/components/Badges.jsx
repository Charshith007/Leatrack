import { STAGE_META, STATUS_COLOR } from "../lib/helpers.js";

export function StageBadge({ stage }) {
  const m = STAGE_META[stage] || STAGE_META.contact;
  return <span className={"badge badge-stage-" + stage}><span className="dot"></span>{m.label}</span>;
}

export function StatusPill({ status }) {
  return (
    <span className="status">
      <span className="sdot" style={{ background: STATUS_COLOR[status] || "#8a93a3" }}></span>
      {status}
    </span>
  );
}
