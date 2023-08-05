import React, { useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import ColorChanger from "./ColorChanger";
import FileChanger from "./FileChanger";
import AIChanger from "./AIChanger";
import TextChanger from "./TextChanger";
import PositionChanger from "./PositionChanger";
import Tab from "./Tab";
import "./CustomizationMenu.css";

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
              Reset
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

        const response = await fetch("https://createmyshirt.onrender.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        });

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
            handleClick={() => {
              setActiveTab((prev) =>
                prev === "fileChanger" ? "" : "fileChanger"
              );
              pageContext.currentFileUploaded
                ? pageContext.setLogoTexture({
                    logo: pageContext.currentFileUploaded.logo,
                    logoName: pageContext.currentFileUploaded.logoName,
                  })
                : "";
            }}
          />
          <Tab
            tab="AI"
            handleClick={() => {
              setActiveTab((prev) => (prev === "aiChanger" ? "" : "aiChanger"));
              pageContext.generatedImage
                ? pageContext.setLogoTexture({
                    logo: pageContext.generatedImage,
                    logoName: "AI",
                  })
                : "";
            }}
          />
          <Tab
            tab="Position"
            handleClick={() => {
              setActiveTab((prev) =>
                prev === "posChanger" ? "" : "posChanger"
              );
            }}
          />
          <Tab
            tab="Text"
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
