import React, { useState, useEffect, useRef } from "react";
import SettingsPanel from "./SettingsPanel";
import "./App.css";

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({
    rate: 1,
    pitch: 1,
    lang: "en-IN",
  });
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("dark"); // Theme state

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = settings.lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript.toLowerCase();
      setTranscript(speechToText);
      addMessage("User", speechToText);
      handleCommand(speechToText);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [settings.lang]);

  useEffect(() => {
    // Update document body class for theme
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.lang = settings.lang;
    window.speechSynthesis.speak(utterance);
    addMessage("Jarvis", text);
  };

  const handleCommand = async (msg) => {
    if (msg.includes("hello") || msg.includes("hi")) {
      speak("Hello! How can I help you?");
    } else if (msg.includes("your name")) {
      speak("My name is Jarvis. I was developed by Kamlesh Joshi.");
    } else if (msg.includes("open youtube")) {
      speak("Opening YouTube");
      window.open("https://www.youtube.com", "_blank");
    } else if (msg.includes("open facebook")) {
      speak("Opening Facebook");
      window.open("https://www.facebook.com", "_blank");
    } else if (msg.includes("weather in mumbai")) {
      speak("Checking weather for Mumbai");
      speak("The current weather in Mumbai is 30 degrees Celsius and clear sky.");
    } else if (msg.includes("weather in delhi")) {
      speak("Checking weather for Delhi");
      speak("In Delhi, it's 34 degrees Celsius with scattered clouds.");
    } else if (msg.includes("weather in")) {
      speak("Sorry, I can only tell weather for Mumbai and Delhi right now.");
    } else if (msg.includes("news")) {
      speak("Fetching latest headlines.");
      const newsText = await getSampleNews(); // Or fetch real news
      speak(newsText);
    } else if (msg.includes("thank you") || msg.includes("thanks")) {
      speak("You're welcome!");
    }
    // New Time/Date commands
    else if (msg.includes("time")) {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      speak(`The current time is ${timeString}`);
    } else if (msg.includes("date")) {
      const now = new Date();
      const dateString = now.toDateString();
      speak(`Today's date is ${dateString}`);
    }
    // Theme toggle commands
    else if (msg.includes("dark mode")) {
      setTheme("dark");
      speak("Dark mode enabled");
    } else if (msg.includes("light mode")) {
      setTheme("light");
      speak("Light mode enabled");
    } else if (msg.includes("toggle theme")) {
      setTheme(theme === "dark" ? "light" : "dark");
      speak(`Switched to ${theme === "dark" ? "light" : "dark"} mode`);
    } else {
      speak("Sorry, I didn't understand that. Can you please repeat?");
    }
  };

  const getSampleNews = async () => {
    // Simulated sample news
    return "Top headline: Government launches new digital India program. Another headline: Heavy rains expected in Mumbai this week.";
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <img src="/logo.jpg" alt="Assistant Logo" id="logo" />
      <h1 id="name">Jarvis</h1>

      <button id="btn" onClick={toggleListening}>
        {isListening ? "Listening..." : "Start Listening"}
        <img
          src="/Voice.gif"
          alt="Speaking Animation"
          id="Voice"
          style={{ display: isListening ? "inline-block" : "none" }}
        />
      </button>

      <div className="transcript-box">
        <strong>You said:</strong> {transcript || "Say something..."}
      </div>

      <button className="settings-btn" onClick={() => setShowSettings(true)}>
        ⚙️ Settings
      </button>

      {showSettings && (
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender === "User" ? "user-message" : "jarvis-message"}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
