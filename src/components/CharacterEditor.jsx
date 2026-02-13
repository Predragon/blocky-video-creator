import { COLORS, ANIMATIONS, ACCESSORIES } from '../lib/constants';
import ColorGrid from './ColorGrid';

export default function CharacterEditor({
  characters, selectedChar, setSelectedChar,
  updateChar, addCharacter, removeCharacter,
}) {
  const sel = characters[selectedChar] || characters[0];

  return (
    <div>
      {/* Character selector */}
      <div className="char-selector">
        {characters.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setSelectedChar(i)}
            className={`char-btn ${selectedChar === i ? 'active' : ''}`}
          >
            {c.name}
          </button>
        ))}
        <button
          onClick={addCharacter}
          disabled={characters.length >= 4}
          className="char-add-btn"
        >
          + Add
        </button>
        <button
          onClick={removeCharacter}
          disabled={characters.length <= 1}
          className="char-remove-btn"
        >
          ✕ Remove
        </button>
      </div>

      {/* Position */}
      <div className="slider-group">
        <div className="slider-label">Position X</div>
        <input
          type="range" min={-4} max={4} step={0.25}
          value={sel.x}
          onChange={(e) => updateChar('x', parseFloat(e.target.value))}
        />
      </div>

      <ColorGrid label="SKIN" colors={COLORS.skin} current={sel.skin} onChange={(v) => updateChar('skin', v)} />
      <ColorGrid label="SHIRT" colors={COLORS.shirt} current={sel.shirt} onChange={(v) => updateChar('shirt', v)} />
      <ColorGrid label="PANTS" colors={COLORS.pants} current={sel.pants} onChange={(v) => updateChar('pants', v)} />
      <ColorGrid label="HAIR" colors={COLORS.hair} current={sel.hair} onChange={(v) => updateChar('hair', v)} />
      <ColorGrid label="HAT" colors={COLORS.hat} current={sel.hat} onChange={(v) => updateChar('hat', v)} />

      {/* Accessory */}
      <div className="option-group">
        <div className="option-label">ACCESSORY</div>
        <div className="option-buttons">
          {ACCESSORIES.map((a) => (
            <button
              key={a}
              onClick={() => updateChar('accessory', a)}
              className={`option-btn ${sel.accessory === a ? 'active' : ''}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Animation */}
      <div className="option-group">
        <div className="option-label">ANIMATION</div>
        <div className="option-buttons">
          {ANIMATIONS.map((a) => (
            <button
              key={a}
              onClick={() => updateChar('animation', a)}
              className={`option-btn anim ${sel.animation === a ? 'active' : ''}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
