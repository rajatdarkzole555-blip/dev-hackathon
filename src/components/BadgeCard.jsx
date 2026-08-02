const palette = [
  { fill: "#F0997B", shadow: "#D85A30", text: "#4A1B0C" },
  { fill: "#5DCAA5", shadow: "#0F6E56", text: "#04342C" },
  { fill: "#FAC775", shadow: "#BA7517", text: "#412402" },
  { fill: "#AFA9EC", shadow: "#534AB7", text: "#26215C" },
];

const rotations = [-4, 3, -3, 4];

export default function BadgeCard({ badge, index = 0 }) {
  const color = palette[index % palette.length];
  const rotate = rotations[index % rotations.length];

  return (
    <div className="sticker-wrap" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="sticker-shadow" style={{ background: color.shadow }}></div>
      <div className="sticker-card" style={{ background: color.fill }}>
        <div className="sticker-seal">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13l4 4L19 7" stroke={color.text} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="sticker-issuer" style={{ color: color.text }}>{badge.issuer}</p>
        <h3 className="sticker-title">{badge.name}</h3>
        <p className="sticker-date" style={{ color: color.text }}>{badge.date}</p>
        <p className="sticker-desc">{badge.description}</p>
      </div>
    </div>
  );
}