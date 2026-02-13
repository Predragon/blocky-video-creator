import { useState, useRef, useCallback } from 'react';
import Viewport from './components/Viewport';
import SceneSelector from './components/SceneSelector';
import CharacterEditor from './components/CharacterEditor';
import TextBubble, { BubbleOverlay } from './components/TextBubble';
import CameraControls from './components/CameraControls';
import RecordPanel from './components/RecordPanel';
import { DEFAULT_CHARACTERS, COLORS } from './lib/constants';
import './App.css';

const TABS = ['scene', 'character', 'text', 'record'];
const TAB_ICONS = { scene: '\u{1F30D}', character: '\u{1F9D1}', text: '\u{1F4AC}', record: '\u{1F3AC}' };

export default function App() {
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const countIntervalRef = useRef(null);

  const [characters, setCharacters] = useState(DEFAULT_CHARACTERS);
  const [selectedChar, setSelectedChar] = useState(0);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [textBubble, setTextBubble] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [activeTab, setActiveTab] = useState('scene');
  const [cameraAngle, setCameraAngle] = useState(0);
  const [cameraHeight, setCameraHeight] = useState(3);
  const [zoom, setZoom] = useState(6);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSeconds, setRecordedSeconds] = useState(0);

  const updateChar = useCallback((key, value) => {
    setCharacters((prev) =>
      prev.map((c, i) => (i === selectedChar ? { ...c, [key]: value } : c))
    );
  }, [selectedChar]);

  const addCharacter = useCallback(() => {
    if (characters.length >= 4) return;
    const positions = [-3, -1, 1, 3];
    setCharacters((prev) => {
      const newChar = {
        id: Date.now(),
        x: positions[prev.length] || 0,
        skin: COLORS.skin[Math.floor(Math.random() * COLORS.skin.length)],
        shirt: COLORS.shirt[Math.floor(Math.random() * COLORS.shirt.length)],
        pants: COLORS.pants[Math.floor(Math.random() * COLORS.pants.length)],
        hair: COLORS.hair[Math.floor(Math.random() * COLORS.hair.length)],
        hat: 'none',
        accessory: 'none',
        animation: 'idle',
        name: `Player ${prev.length + 1}`,
      };
      return [...prev, newChar];
    });
    setSelectedChar(characters.length);
  }, [characters.length]);

  const removeCharacter = useCallback(() => {
    if (characters.length <= 1) return;
    setCharacters((prev) => prev.filter((_, i) => i !== selectedChar));
    setSelectedChar(0);
  }, [characters.length, selectedChar]);

  const startRecording = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'blocky-video.webm';
      a.click();
      URL.revokeObjectURL(url);
      setIsRecording(false);
      setRecordedSeconds(0);
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
    setRecordedSeconds(0);

    let secs = 0;
    countIntervalRef.current = setInterval(() => {
      secs++;
      setRecordedSeconds(secs);
    }, 1000);

    setTimeout(() => {
      clearInterval(countIntervalRef.current);
      if (recorder.state === 'recording') recorder.stop();
    }, 15000);
  }, []);

  const stopRecording = useCallback(() => {
    clearInterval(countIntervalRef.current);
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  return (
    <div className="app">
      <Viewport
        characters={characters}
        sceneIdx={sceneIdx}
        cameraAngle={cameraAngle}
        cameraHeight={cameraHeight}
        zoom={zoom}
        canvasRef={canvasRef}
      />

      {/* Header */}
      <header className="header">
        <h1 className="title">BLOCKY VIDEO CREATOR</h1>
        <p className="subtitle">Create Roblox-style animated scenes</p>
      </header>

      {/* Viewport */}
      <div className="viewport-container">
        <canvas ref={canvasRef} />
        <BubbleOverlay text={textBubble} visible={showBubble} />
        {isRecording && (
          <div className="rec-indicator">
            <div className="rec-dot" />
            REC {recordedSeconds}s
          </div>
        )}
      </div>

      {/* Camera Controls */}
      <CameraControls
        cameraAngle={cameraAngle} setCameraAngle={setCameraAngle}
        cameraHeight={cameraHeight} setCameraHeight={setCameraHeight}
        zoom={zoom} setZoom={setZoom}
      />

      {/* Tabs */}
      <div className="panel">
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            >
              {TAB_ICONS[tab]} {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'scene' && (
            <SceneSelector sceneIdx={sceneIdx} setSceneIdx={setSceneIdx} />
          )}
          {activeTab === 'character' && (
            <CharacterEditor
              characters={characters}
              selectedChar={selectedChar}
              setSelectedChar={setSelectedChar}
              updateChar={updateChar}
              addCharacter={addCharacter}
              removeCharacter={removeCharacter}
            />
          )}
          {activeTab === 'text' && (
            <TextBubble
              textBubble={textBubble} setTextBubble={setTextBubble}
              showBubble={showBubble} setShowBubble={setShowBubble}
            />
          )}
          {activeTab === 'record' && (
            <RecordPanel
              isRecording={isRecording}
              recordedSeconds={recordedSeconds}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
          )}
        </div>
      </div>
    </div>
  );
}
