import React from "react";

const VoiceGif = ({ active }) => {
  return (
    <div className="voice-gif-container">
      <img
        src="/Voice.gif"
        alt="voice"
        id="Voice"
        style={{ opacity: active ? 1 : 0.3, transition: "opacity 0.3s ease-in-out" }}
      />
    </div>
  );
};

export default VoiceGif;
