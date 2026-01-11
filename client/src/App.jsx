import { useEffect, useState, useMemo, lazy, Suspense } from "react";
const Canvas = lazy(() => import("./canvas"));
const Customizer = lazy(() => import("./pages/Customizer"));
const Home = lazy(() => import("./pages/Home"));
import { PageContext } from "./context/PageContext";
import { DALLE_API_URL } from "./utils/api";

function App() {
  const [intro, setIntro] = useState(true);
  const [isFullTexture, setIsFullTexture] = useState(false);
  const [isLogoTexture, setIsLogoTexture] = useState(true);
  const [isTextOverlay, setIsTextOverlay] = useState(true);
  const [shirtColor, setShirtColor] = useState("chocolate");
  const [textColor, setTextColor] = useState("black");
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
    size: 0.15,
    rotation: 0,
  });
  const [logoPos, setLogoPos] = useState({
    x: 0,
    y: 0.04,
    size: 0.15,
    rotation: 0,
  });

  useEffect(() => {
    // Warm up the backend (helps with Render cold starts).
    const controller = new AbortController();
    fetch(DALLE_API_URL, { signal: controller.signal }).catch(() => {});
    return () => controller.abort();
  }, []);

  const contextValue = useMemo(() => ({
    intro,
    setIntroFunc: setIntro,
    isFullTexture,
    setIsFullTexture,
    isLogoTexture,
    setIsLogoTexture,
    shirtColor,
    setShirtColor,
    logoTexture,
    setLogoTexture,
    currentFileUploaded,
    setCurrentFileUploaded,
    generatedImage,
    setGeneratedImage,
    textOverlay,
    setTextOverlay,
    isTextOverlay,
    setIsTextOverlay,
    textPos,
    setTextPos,
    logoPos,
    setLogoPos,
    textColor,
    setTextColor,
  }), [
    intro,
    isFullTexture,
    isLogoTexture,
    shirtColor,
    logoTexture,
    currentFileUploaded,
    generatedImage,
    textOverlay,
    isTextOverlay,
    textPos,
    logoPos,
    textColor,
  ]);

  return (
    <PageContext.Provider value={contextValue}>
      <main>
        <Home />
        <Suspense fallback={<div className="loadingCanvas"></div>}>
          <Canvas />
        </Suspense>
        <Customizer />
      </main>
    </PageContext.Provider>
  );
}

export default App;
