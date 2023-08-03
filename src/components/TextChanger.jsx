import React, { useRef } from "react";

const TextChanger = () => {
  const inputRef = useRef(null);

  function handleClick() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = "transparent";
    let fontSize = 50;
    ctx.font = `${fontSize}px Arial`;
    const text = inputRef.current.value;
    const textWidth = ctx.measureText(text).width;
    const x = (canvas.width - textWidth) / 2;
    const y = (canvas.height + fontSize) / 2;
    ctx.fillText(text, x, y);
    const dataUrl = canvas.toDataURL();
    console.log(dataUrl);
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
      <button onClick={handleClick}>Set Text</button>
    </div>
  );
};

export default TextChanger;
