import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";

const AIChanger = ({ prompt, setPrompt, generatingImage, handleSubmit }) => {
  const pageContext = useContext(PageContext);

  return (
    <div className="aiChanger">
      <textarea
        className="aiChangerTextArea"
        placeholder="Ask AI for a design..."
        rows={10}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="aiButtons">
        {generatingImage ? (
          <button className="aiButton">Asking AI...</button>
        ) : (
          <>
            <button
              className={
                pageContext.isLogoTexture ? "aiButtonSelected" : "aiButton"
              }
              onClick={() => handleSubmit("logo")}
            >
              AI Logo
            </button>
            <button
              className={
                pageContext.isFullTexture ? "aiButtonSelected" : "aiButton"
              }
              onClick={() => handleSubmit("full")}
            >
              AI Full
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChanger;
