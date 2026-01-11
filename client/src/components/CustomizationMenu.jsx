import React, { useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import ColorChanger from "./ColorChanger";
import FileChanger from "./FileChanger";
import AIChanger from "./AIChanger";
import TextChanger from "./TextChanger";
import PositionChanger from "./PositionChanger";
import Tab from "./Tab";
import "./CustomizationMenu.css";
import { DALLE_API_URL } from "../utils/api";

const CustomizationMenu = () => {
  const pageContext = useContext(PageContext);

  const [activeTab, setActiveTab] = useState();
  const [prompt, setPrompt] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);

  useEffect(() => {
    function handleClickOutsideMenu(e) {
      if (String(e.target.nodeName) === "CANVAS") {
        setActiveTab();
      }
    }
    window.addEventListener("click", handleClickOutsideMenu);
    window.addEventListener("touchstart", handleClickOutsideMenu);
    return () => {
      window.removeEventListener("click", handleClickOutsideMenu);
      window.removeEventListener("touchstart", handleClickOutsideMenu);
    };
  }, []);

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
      case "textChanger":
        return <TextChanger />;
      case "posChanger":
        return (
          <div className="logoPosChanger">
            <PositionChanger elementToPos="logo" />
            <button className="setTextBtn" onClick={handleResetLogoPos}>
              Reset Logo Position
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  function handleResetLogoPos() {
    pageContext.setLogoPos({
      x: 0,
      y: 0.04,
      size: 0.15,
      rotation: 0,
    });
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    if (prompt.length > 0 && currentPrompt.localeCompare(prompt) != 0) {
      setCurrentPrompt(prompt);
      try {
        setGeneratingImage(true);

        const response = await fetch(
          DALLE_API_URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: prompt,
            }),
          }
        );

        const data = await response.json();

        pageContext.setLogoTexture({
          logo: `data:image/png;base64,${data.photo}`,
          logoName: "AI",
        });
        pageContext.setGeneratedImage(`data:image/png;base64,${data.photo}`);
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImage(false);
        setActiveTab("");
      }

      type === "logo"
        ? pageContext.setIsLogoTexture(true)
        : pageContext.setIsFullTexture(true);
    } else {
      type === "logo"
        ? pageContext.setIsLogoTexture((prev) => !prev)
        : pageContext.setIsFullTexture((prev) => !prev);
    }
  };

  return (
    <div className="customMenu">
      {generatingImage && (
        <div className="ai-loading-overlay">
          <div className="ai-loading-spinner"></div>
          <p>Generating your design...</p>
        </div>
      )}
      <div className="customMenuContainer">
        <div className="customTab">
          <Tab
            tab="Color"
            isActive={activeTab === "colorChanger"}
            handleClick={() =>
              setActiveTab((prev) =>
                prev === "colorChanger" ? "" : "colorChanger"
              )
            }
          />
          <Tab
            tab="File"
            isActive={activeTab === "fileChanger"}
            handleClick={() => {
              setActiveTab((prev) =>
                prev === "fileChanger" ? "" : "fileChanger"
              );
              // Don't automatically change the logo when opening the tab
              // The logo should only change when a new file is actually uploaded
            }}
          />
          <Tab
            tab="AI"
            isActive={activeTab === "aiChanger"}
            handleClick={() => {
              setActiveTab((prev) => (prev === "aiChanger" ? "" : "aiChanger"));
              // Don't automatically change the logo when opening the tab
              // The logo should only change when AI generates a new image
            }}
          />
          <Tab
            tab="Position"
            isActive={activeTab === "posChanger"}
            handleClick={() => {
              setActiveTab((prev) =>
                prev === "posChanger" ? "" : "posChanger"
              );
            }}
          />
          <Tab
            tab="Text"
            isActive={activeTab === "textChanger"}
            handleClick={() => {
              setActiveTab((prev) =>
                prev === "textChanger" ? "" : "textChanger"
              );
            }}
          />
        </div>
        {generateTabContent()}
      </div>
    </div>
  );
};

export default CustomizationMenu;
