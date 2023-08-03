import React, { useRef, useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import FontPicker from "font-picker-react";
import PositionChanger from "./PositionChanger";

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
      <PositionChanger
        minX={-0.08}
        maxX={0.08}
        minY={-0.3}
        maxY={0.18}
        minSize={0.05}
        maxSize={1}
      />
      <button onClick={handleClick}>Set Text</button>
    </div>
  );
};

export default TextChanger;
