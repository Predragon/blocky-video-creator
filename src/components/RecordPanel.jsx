export default function RecordPanel({ isRecording, recordedSeconds, startRecording, stopRecording }) {
  return (
    <div className="record-panel">
      <p className="record-info">
        Record up to 15 seconds of your scene as a video. Set up your characters, animations, and camera angle first!
      </p>
      {!isRecording ? (
        <button onClick={startRecording} className="record-btn start">
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording} className="record-btn stop">
          Stop &amp; Download
        </button>
      )}
    </div>
  );
}
