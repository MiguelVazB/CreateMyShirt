import React, { useRef, useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import FontPicker from "font-picker-react";

const TextChanger = () => {
  const pageContext = useContext(PageContext);
  const inputRef = useRef(null);
  const [currentFont, setCurrentFont] = useState("Open Sans");

  const [apiKey, setApiKey] = useState("");
  const [apiKeyReady, setApiKeyReady] = useState(false);

  function handleClick() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = "transparent";
    let fontSize = 50;
    ctx.font = `${fontSize}px ${currentFont}`;
    const text = inputRef.current.value;
    const textWidth = ctx.measureText(text).width;
    const x = (canvas.width - textWidth) / 2;
    const y = (canvas.height + fontSize) / 2;
    ctx.fillText(text, x, y);
    const dataUrl = canvas.toDataURL();
    pageContext.setTextOverlay(dataUrl);
    pageContext.setIsTextOverlay(true);
  }

  useEffect(() => {
    setApiKey(import.meta.env.VITE_API_KEY);
  }, []);

  useEffect(() => {
    if (apiKey) setApiKeyReady(true);
  }, [apiKey]);

  function handleXPosChange(event) {
    let xPos = Number(event.target.value);
    pageContext.setTextPos((prev) => {
      return {
        ...prev,
        x: xPos,
      };
    });
  }

  return (
    <div className="textChanger">
      <label htmlFor="textEntered">Text to put on the shirt:</label>
      <input
        ref={inputRef}
        id="textEntered"
        type="text"
        placeholder="Enter text..."
      />
      {apiKeyReady && (
        <FontPicker
          apiKey={apiKey}
          activeFontFamily={currentFont}
          onChange={(nextFont) => setCurrentFont(nextFont.family)}
        />
      )}
      <label htmlFor="positionX">X Position:</label>
      <input
        type="range"
        id="positionX"
        name="positionX"
        min={-0.06}
        max={0.06}
        step={0.01}
        value={pageContext.textPos.x}
        onChange={handleXPosChange}
      />
      <input
        id="positionXInput"
        type="number"
        min={-0.06}
        max={0.06}
        step={0.01}
        value={pageContext.textPos.x}
        onChange={handleXPosChange}
      />
      <button onClick={handleClick}>Set Text</button>
    </div>
  );
};

export default TextChanger;
