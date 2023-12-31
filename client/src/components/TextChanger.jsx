import React, { useRef, useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import { ChromePicker } from "react-color";
import FontPicker from "font-picker-react";
import PositionChanger from "./PositionChanger";

const TextChanger = () => {
  const pageContext = useContext(PageContext);
  const inputRef = useRef(null);
  const [currentFont, setCurrentFont] = useState("Open Sans");

  const [apiKey, setApiKey] = useState("");
  const [apiKeyReady, setApiKeyReady] = useState(false);

  function handleClick() {
    let inputText = inputRef.current.value;
    if (inputText.length > 0) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.backgroundColor = "transparent";
      let fontSize = 50;
      ctx.font = `${fontSize}px ${currentFont}`;
      ctx.fillStyle = pageContext.textColor;
      const text = inputRef.current.value;
      const textWidth = ctx.measureText(text).width;
      const x = (canvas.width - textWidth) / 2;
      const y = (canvas.height + fontSize) / 2;
      ctx.fillText(text, x, y);
      const dataUrl = canvas.toDataURL();
      pageContext.setTextOverlay(dataUrl);
      pageContext.setIsTextOverlay(true);
    } else {
      alert("Enter a text!");
    }
  }

  function resetToDefault() {
    pageContext.setTextPos({
      x: 0.07,
      y: 0.14,
      size: 0.15,
      rotation: 0,
    });
  }

  const handleChangeComplete = (color) => {
    pageContext.setTextColor(color.hex);
  };

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
      <PositionChanger />
      <ChromePicker
        color={pageContext.textColor}
        width="fit-content"
        disableAlpha
        onChange={handleChangeComplete}
      />
      <div className="textChangerButtons">
        <button type="reset" className="setTextBtn" onClick={resetToDefault}>
          Reset
        </button>
        <button className="setTextBtn" onClick={handleClick}>
          Set Text
        </button>
      </div>
    </div>
  );
};

export default TextChanger;
