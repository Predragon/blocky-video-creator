export default function TextBubble({ textBubble, setTextBubble, showBubble, setShowBubble }) {
  return (
    <div>
      <input
        type="text"
        value={textBubble}
        onChange={(e) => setTextBubble(e.target.value)}
        placeholder="Type a speech bubble..."
        maxLength={80}
        className="text-input"
      />
      <button
        onClick={() => setShowBubble(!showBubble)}
        className={`bubble-toggle-btn ${showBubble ? 'hide' : 'show'}`}
      >
        {showBubble ? 'Hide Bubble' : 'Show Bubble'}
      </button>
    </div>
  );
}

export function BubbleOverlay({ text, visible }) {
  if (!visible || !text) return null;
  return (
    <div className="speech-bubble">
      {text}
      <div className="speech-bubble-arrow" />
    </div>
  );
}
