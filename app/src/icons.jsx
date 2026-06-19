import React from "react";

// Lucide-style stroke icons (24x24, 2px). Functional UI glyphs.
const Ic = (paths, vb = "0 0 24 24") => ({ size = 18, stroke = 2, ...p } = {}) =>
  React.createElement(
    "svg",
    { width: size, height: size, viewBox: vb, fill: "none", stroke: "currentColor",
      strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", ...p },
    paths.map((d, i) =>
      typeof d === "string"
        ? React.createElement("path", { key: i, d })
        : React.createElement(d.t, { key: i, ...d.a })
    )
  );

export const Icons = {
  Grid: Ic([{ t: "rect", a: { x: 3, y: 3, width: 7, height: 7, rx: 1 } },
            { t: "rect", a: { x: 14, y: 3, width: 7, height: 7, rx: 1 } },
            { t: "rect", a: { x: 14, y: 14, width: 7, height: 7, rx: 1 } },
            { t: "rect", a: { x: 3, y: 14, width: 7, height: 7, rx: 1 } }]),
  Contacts: Ic(["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", { t: "circle", a: { cx: 9, cy: 7, r: 4 } }, "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]),
  Leads: Ic(["M20 7h-9", "M14 17H5", { t: "circle", a: { cx: 17, cy: 17, r: 3 } }, { t: "circle", a: { cx: 7, cy: 7, r: 3 } }]),
  Users: Ic([{ t: "circle", a: { cx: 12, cy: 8, r: 5 } }, "M20 21a8 8 0 0 0-16 0"]),
  Menu: Ic(["M3 6h18", "M3 12h18", "M3 18h18"]),
  Search: Ic([{ t: "circle", a: { cx: 11, cy: 11, r: 8 } }, "m21 21-4.3-4.3"]),
  Plus: Ic(["M12 5v14", "M5 12h14"]),
  Upload: Ic(["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"]),
  Download: Ic(["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"]),
  X: Ic(["M18 6 6 18", "M6 6l12 12"]),
  Eye: Ic(["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z", { t: "circle", a: { cx: 12, cy: 12, r: 3 } }]),
  EyeOff: Ic(["M9.88 9.88a3 3 0 1 0 4.24 4.24", "M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68", "M6.61 6.61A13.5 13.5 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61", "m2 2 20 20"]),
  ArrowRight: Ic(["M5 12h14", "m12 5 7 7-7 7"]),
  ChevronRight: Ic(["m9 18 6-6-6-6"]),
  Logout: Ic(["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]),
  Trash: Ic(["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]),
  Mail: Ic([{ t: "rect", a: { x: 2, y: 4, width: 20, height: 16, rx: 2 } }, "m22 7-10 5L2 7"]),
  Phone: Ic(["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"]),
  Pin: Ic(["M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", { t: "circle", a: { cx: 12, cy: 10, r: 3 } }]),
  Home: Ic(["m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]),
  Trend: Ic(["M22 7 13.5 15.5 8.5 10.5 2 17", "M16 7h6v6"]),
  Spark: Ic(["M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"]),
  Filter: Ic(["M22 3H2l8 9.46V19l4 2v-8.54z"]),
  Check: Ic(["M20 6 9 17l-5-5"]),
  Rocket: Ic(["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z", "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z", "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"]),
  Dot: Ic([{ t: "circle", a: { cx: 12, cy: 12, r: 3 } }]),
  Sort: Ic(["m3 16 4 4 4-4", "M7 20V4", "m21 8-4-4-4 4", "M17 4v16"]),
  Brain: Ic(["M9.5 2a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-4.96.5", "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.5",
    "M9.5 8.5a2.5 2.5 0 0 0-2.96-2.45", "M14.5 8.5a2.5 2.5 0 0 1 2.96-2.45",
    "M5 11a2.5 2.5 0 0 1 0-5", "M19 11a2.5 2.5 0 0 0 0-5",
    "M5 11a2.5 2.5 0 0 0 2 4.45", "M19 11a2.5 2.5 0 0 1-2 4.45"]),
  Layers: Ic(["m12 2 9 5-9 5-9-5 9-5Z", "m3 12 9 5 9-5", "m3 17 9 5 9-5"]),
  AlertTriangle: Ic(["m10.29 3.86-8.18 14a2 2 0 0 0 1.71 3h16.36a2 2 0 0 0 1.71-3l-8.18-14a2 2 0 0 0-3.42 0Z", "M12 9v4", "M12 17h.01"]),
  MessageCircle: Ic(["M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"]),
  Target: Ic([{ t: "circle", a: { cx: 12, cy: 12, r: 9 } }, { t: "circle", a: { cx: 12, cy: 12, r: 5 } }, { t: "circle", a: { cx: 12, cy: 12, r: 1 } }]),
  Bot: Ic([{ t: "rect", a: { x: 3, y: 9, width: 18, height: 11, rx: 2 } }, "M12 2v4", "M8 14v1", "M16 14v1", "M3 14H1", "M23 14h-2"]),
  Send: Ic(["m22 2-7 20-4-9-9-4Z", "M22 2 11 13"]),
};
