import React from "react";

const VoiceButton = ({ onClick, content }) => {
  return (
    <button id="btn" onClick={onClick}>
      <img src="/mic.svg" alt="mic" />
      <span id="content">{content}</span>
    </button>
  );
};

export default VoiceButton;
