export function Frame({ url, dark = false, children, className = "", bodyStyle }) {
  return (
    <div className={"frame" + (className ? " " + className : "")}>
      <div className="frame-bar">
        <span className="tl" style={{ background: "#ff5f57" }} />
        <span className="tl" style={{ background: "#febc2e" }} />
        <span className="tl" style={{ background: "#28c840" }} />
        {url && (
          <span className="url">
            {dark && (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8b958f" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            )}
            {url}
          </span>
        )}
      </div>
      <div className="frame-body" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
}
