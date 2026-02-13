export default function CameraControls({ cameraAngle, setCameraAngle, cameraHeight, setCameraHeight, zoom, setZoom }) {
  return (
    <div className="camera-controls">
      <div className="camera-slider">
        <div className="camera-slider-label">Camera Angle</div>
        <input
          type="range" min={-3.14} max={3.14} step={0.1}
          value={cameraAngle}
          onChange={(e) => setCameraAngle(parseFloat(e.target.value))}
        />
      </div>
      <div className="camera-slider">
        <div className="camera-slider-label">Height</div>
        <input
          type="range" min={1} max={8} step={0.2}
          value={cameraHeight}
          onChange={(e) => setCameraHeight(parseFloat(e.target.value))}
        />
      </div>
      <div className="camera-slider">
        <div className="camera-slider-label">Zoom</div>
        <input
          type="range" min={3} max={12} step={0.2}
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
