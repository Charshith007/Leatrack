const LOGOS = ["Northpoint Realty", "Vanguard Homes", "BlueKey Properties", "Meridian Group", "Anchor & Co."];

export function SocialProof() {
  return (
    <div className="proof">
      <div className="wrap">
        <p className="label">Trusted by 500+ real estate teams across the US</p>
        <div className="logos">
          {LOGOS.map((l) => (
            <span className="lg" key={l}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
