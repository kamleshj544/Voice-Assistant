import React from "react";

const Header = () => {
  return (
    <header>
      <img src="/logo.jpg" alt="logo" id="logo" />
      <h1>
        I'm <span id="name">Jarvis</span>, Your <span id="va">Virtual Assistant</span>
      </h1>
    </header>
  );
};

export default Header;
