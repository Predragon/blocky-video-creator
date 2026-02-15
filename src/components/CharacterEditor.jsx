import { COLORS, ANIMATIONS, ACCESSORIES, HAIR_STYLES, EYE_COLORS, EXPRESSIONS, CLOTHING_TYPES, SOCK_COLORS } from '../lib/constants';
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
        <div className="slider-label">Position X (left/right)</div>
        <input
          type="range" min={-8} max={8} step={0.25}
          value={sel.x}
          onChange={(e) => updateChar('x', parseFloat(e.target.value))}
        />
      </div>
      <div className="slider-group">
        <div className="slider-label">Position Z (near/far)</div>
        <input
          type="range" min={-8} max={8} step={0.25}
          value={sel.z || 0}
          onChange={(e) => updateChar('z', parseFloat(e.target.value))}
        />
      </div>

      <ColorGrid label="SKIN" colors={COLORS.skin} current={sel.skin} onChange={(v) => updateChar('skin', v)} />
      <ColorGrid label="HAIR COLOR" colors={COLORS.hair} current={sel.hair} onChange={(v) => updateChar('hair', v)} />

      {/* Hair Style */}
      <div className="option-group">
        <div className="option-label">HAIR STYLE</div>
        <div className="option-buttons">
          {HAIR_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => updateChar('hairStyle', s)}
              className={`option-btn ${(sel.hairStyle || 'default') === s ? 'active' : ''}`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <ColorGrid label="EYE COLOR" colors={EYE_COLORS} current={sel.eyeColor || '#111111'} onChange={(v) => updateChar('eyeColor', v)} />

      {/* Expression */}
      <div className="option-group">
        <div className="option-label">EXPRESSION</div>
        <div className="option-buttons">
          {EXPRESSIONS.map((e) => (
            <button
              key={e}
              onClick={() => updateChar('expression', e)}
              className={`option-btn ${(sel.expression || 'neutral') === e ? 'active' : ''}`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <ColorGrid label="SHIRT" colors={COLORS.shirt} current={sel.shirt} onChange={(v) => updateChar('shirt', v)} />

      {/* Clothing Type */}
      <div className="option-group">
        <div className="option-label">CLOTHING</div>
        <div className="option-buttons">
          {CLOTHING_TYPES.map((c) => (
            <button
              key={c}
              onClick={() => updateChar('clothing', c)}
              className={`option-btn ${(sel.clothing || 'pants') === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ColorGrid
        label={(sel.clothing === 'skirt' || sel.clothing === 'uniform') ? 'SKIRT COLOR' : 'PANTS COLOR'}
        colors={COLORS.pants}
        current={sel.pants}
        onChange={(v) => updateChar('pants', v)}
      />

      <ColorGrid label="SOCKS" colors={SOCK_COLORS} current={sel.socks || 'none'} onChange={(v) => updateChar('socks', v)} />

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
