import React, { useContext } from "react";
import readFileContent from "../utils/FileReader";
import { PageContext } from "../context/PageContext";

const FileChanger = () => {
  const pageContext = useContext(PageContext);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      readFileContent(selectedFile, ({ content, url }) => {
        if (selectedFile.type.startsWith("image/")) {
          pageContext.setLogoTexture({
            logo: url,
            logoName: selectedFile.name,
          });
        } else {
          pageContext.setLogoTexture((prev) => ({
            logo: prev.logo,
            logoName: "Selected file is not an image",
          }));
        }
      });
    }
  };

  return (
    <div className="fileUploadContainer">
      <div className="fileContainer">
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="uploadBtn"
        >
          Click to upload file
        </button>
        <p>
          {pageContext.logoTexture.logoName
            ? pageContext.logoTexture.logoName
            : "File not selected"}
        </p>
      </div>
      <div className="textureType">
        <button
          className={
            pageContext.isLogoTexture ? "textureSelected" : "textureTypeBtn"
          }
          onClick={() => {
            pageContext.setIsLogoTexture((prev) => !prev);
          }}
        >
          Logo
        </button>
        <button
          className={
            pageContext.isFullTexture ? "textureSelected" : "textureTypeBtn"
          }
          onClick={() => {
            pageContext.setIsFullTexture((prev) => !prev);
          }}
        >
          Full
        </button>
      </div>
    </div>
  );
};

export default FileChanger;
