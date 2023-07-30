import React, { useContext } from "react";
import readFileContent from "../utils/FileReader";
import { PageContext } from "../context/PageContext";

const FileChanger = () => {
  const pageContext = useContext(PageContext);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      readFileContent(selectedFile, ({ url }) => {
        pageContext.setLogoTexture(url);
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      <button
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        Click to upload file
      </button>
    </div>
  );
};

export default FileChanger;
