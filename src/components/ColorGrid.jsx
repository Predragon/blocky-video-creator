export default function ColorGrid({ colors, current, onChange, label }) {
  return (
    <div className="color-grid-group">
      <div className="color-grid-label">{label}</div>
      <div className="color-grid">
        {colors.map((c) => (
          <div
            key={c}
            onClick={() => onChange(c)}
            className={`color-swatch ${c === current ? 'active' : ''} ${c === 'none' ? 'none' : ''}`}
            style={{ backgroundColor: c === 'none' ? 'transparent' : c }}
          >
            {c === 'none' ? '\u2715' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
