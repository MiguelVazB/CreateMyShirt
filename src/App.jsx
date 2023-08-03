import { useState } from "react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { PageContext } from "./context/PageContext";

function App() {
  const [intro, setIntro] = useState(true);
  const [isFullTexture, setIsFullTexture] = useState(false);
  const [isLogoTexture, setIsLogoTexture] = useState(true);
  const [isTextOverlay, setIsTextOverlay] = useState(true);
  const [shirtColor, setShirtColor] = useState("chocolate");
  const [logoTexture, setLogoTexture] = useState({
    logo: "./threejsLogo.png",
    logoName: null,
  });
  const [currentFileUploaded, setCurrentFileUploaded] = useState();
  const [generatedImage, setGeneratedImage] = useState("");
  const [textOverlay, setTextOverlay] = useState("./welcome.png");
  const [textPos, setTextPos] = useState({
    x: 0.07,
    y: 0.14,
  });

  return (
    <PageContext.Provider
      value={{
        intro: intro,
        setIntroFunc: setIntro,
        isFullTexture: isFullTexture,
        setIsFullTexture: setIsFullTexture,
        isLogoTexture: isLogoTexture,
        setIsLogoTexture: setIsLogoTexture,
        shirtColor: shirtColor,
        setShirtColor: setShirtColor,
        logoTexture: logoTexture,
        setLogoTexture: setLogoTexture,
        currentFileUploaded: currentFileUploaded,
        setCurrentFileUploaded: setCurrentFileUploaded,
        generatedImage: generatedImage,
        setGeneratedImage: setGeneratedImage,
        textOverlay: textOverlay,
        setTextOverlay: setTextOverlay,
        isTextOverlay: isTextOverlay,
        setIsTextOverlay: setIsTextOverlay,
        textPos: textPos,
        setTextPos: setTextPos,
      }}
    >
      <main>
        <Home />
        <Canvas />
        <Customizer />
      </main>
    </PageContext.Provider>
  );
}

export default App;
