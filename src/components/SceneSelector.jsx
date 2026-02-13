import { SCENES } from '../lib/constants';

export default function SceneSelector({ sceneIdx, setSceneIdx }) {
  return (
    <div className="scene-grid">
      {SCENES.map((s, i) => (
        <button
          key={s.name}
          onClick={() => setSceneIdx(i)}
          className={`scene-btn ${sceneIdx === i ? 'active' : ''}`}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}
