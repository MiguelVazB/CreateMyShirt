import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";

const AIChanger = ({ prompt, setPrompt, generatingImage, handleSubmit }) => {
  const pageContext = useContext(PageContext);
  const maxLength = 1000;
  const remainingChars = maxLength - prompt.length;

  return (
    <div className="aiChanger">
      <textarea
        className="aiChangerTextArea"
        placeholder="e.g., 'cute robot', 'sunset', 'geometric patterns'..."
        rows={8}
        value={prompt}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            setPrompt(e.target.value);
          }
        }}
        maxLength={maxLength}
      />
      <div className="ai-char-counter">
        {remainingChars} / {maxLength}
      </div>
      <div className="aiButtons">
        {generatingImage ? (
          <button className="aiButton" disabled>Generating...</button>
        ) : (
          <>
            <button
              className={
                pageContext.isLogoTexture ? "aiButtonSelected" : "aiButton"
              }
              onClick={() => handleSubmit("logo")}
              title="Small badge on chest"
              disabled={!prompt.trim()}
            >
              Logo
            </button>
            <button
              className={
                pageContext.isFullTexture ? "aiButtonSelected" : "aiButton"
              }
              onClick={() => handleSubmit("full")}
              title="Full shirt design"
              disabled={!prompt.trim()}
            >
              Full
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChanger;
