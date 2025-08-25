import React from "react";

const SettingsPanel = ({ settings, setSettings, onClose }) => {
  return (
    <div className="settings-overlay">
      <div className="settings-container">
        <h2>Voice Settings</h2>
        <label>
          Speed: {settings.rate.toFixed(1)}
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.rate}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, rate: parseFloat(e.target.value) }))
            }
          />
        </label>

        <label>
          Pitch: {settings.pitch.toFixed(1)}
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.pitch}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, pitch: parseFloat(e.target.value) }))
            }
          />
        </label>

        <label>
          Language:
          <select
            value={settings.lang}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, lang: e.target.value }))
            }
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="en-IN">English (India)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
          </select>
        </label>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SettingsPanel;
