import React from "react";

const AIChanger = ({ prompt, setPrompt, generatingImage, handleSubmit }) => {
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
          <button>Asking AI...</button>
        ) : (
          <>
            <button onClick={() => handleSubmit("logo")}>AI Logo</button>
            <button onClick={() => handleSubmit("full")}>AI Full</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChanger;
