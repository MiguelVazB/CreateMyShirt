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
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);

  const generateTabContent = () => {
    switch (activeTab) {
      case "colorChanger":
        return <ColorChanger />;
      case "fileChanger":
        return <FileChanger />;
      case "aiChanger":
        return <AIChanger />;
      default:
        return null;
    }
  };

  return (
    <div className="customMenu">
      <div className="customTab">
        <Tab tab="Color" handleClick={() => setActiveTab("colorChanger")} />
        <Tab tab="File" handleClick={() => setActiveTab("fileChanger")} />
        <Tab tab="AI" handleClick={() => setActiveTab("aiChanger")} />
      </div>
      {generateTabContent()}
    </div>
  );
};

export default CustomizationMenu;
