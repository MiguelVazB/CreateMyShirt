import React, { useContext, useState } from "react";
import { PageContext } from "../context/PageContext";
import ColorChanger from "./ColorChanger";
import FileChanger from "./FileChanger";
import AIChanger from "./AIChanger";
import Tab from "./Tab";
import "./CustomizationMenu.css";

const CustomizationMenu = () => {
  const pageContext = useContext(PageContext);

  const [activeTab, setActiveTab] = useState();
  const [prompt, setPrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);

  const generateTabContent = () => {
    switch (activeTab) {
      case "colorChanger":
        return <ColorChanger />;
      case "fileChanger":
        return <FileChanger />;
      case "aiChanger":
        return (
          <AIChanger
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImage={generatingImage}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImage(false);
      setActiveTab("");
    }
  };

  return (
    <div className="customMenu">
      <div className="customMenuContainer">
        <div className="customTab">
          <Tab
            tab="Color"
            handleClick={() =>
              setActiveTab((prev) =>
                prev === "colorChanger" ? "" : "colorChanger"
              )
            }
          />
          <Tab
            tab="File"
            handleClick={() =>
              setActiveTab((prev) =>
                prev === "fileChanger" ? "" : "fileChanger"
              )
            }
          />
          <Tab
            tab="AI"
            handleClick={() =>
              setActiveTab((prev) => (prev === "aiChanger" ? "" : "aiChanger"))
            }
          />
        </div>
        {generateTabContent()}
      </div>
    </div>
  );
};

export default CustomizationMenu;
