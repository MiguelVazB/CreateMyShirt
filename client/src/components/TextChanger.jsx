import React, { useRef, useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import { HexColorPicker } from "react-colorful";
import GoogleFontPicker from "./GoogleFontPicker";
import PositionChanger from "./PositionChanger";

const TextChanger = () => {
  const pageContext = useContext(PageContext);
  const [inputText, setInputText] = useState("");
  const [currentFont, setCurrentFont] = useState("Open Sans");

  // Update text overlay in real-time whenever text, font, or color changes
  useEffect(() => {
    if (inputText.length > 0) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.backgroundColor = "transparent";
      let fontSize = 50;
      ctx.font = `${fontSize}px ${currentFont}`;
      ctx.fillStyle = pageContext.textColor;
      const textWidth = ctx.measureText(inputText).width;
      const x = (canvas.width - textWidth) / 2;
      const y = (canvas.height + fontSize) / 2;
      ctx.fillText(inputText, x, y);
      const dataUrl = canvas.toDataURL();
      pageContext.setTextOverlay(dataUrl);
      pageContext.setIsTextOverlay(true);
    } else {
      pageContext.setIsTextOverlay(false);
    }
  }, [inputText, currentFont, pageContext.textColor]);

  function resetToDefault() {
    pageContext.setTextPos({
      x: 0.07,
      y: 0.14,
      size: 0.15,
      rotation: 0,
    });
  }

  return (
    <div className="textChanger">
      <label htmlFor="textEntered">Text to put on the shirt:</label>
      <input
        id="textEntered"
        type="text"
        placeholder="Enter text..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <GoogleFontPicker
        activeFontFamily={currentFont}
        onChange={(nextFont) => setCurrentFont(nextFont.family)}
      />
      <PositionChanger />
      <HexColorPicker
        color={pageContext.textColor}
        onChange={pageContext.setTextColor}
      />
      <button type="reset" className="setTextBtn" onClick={resetToDefault}>
        Reset Text Position
      </button>
    </div>
  );
};

export default TextChanger;
