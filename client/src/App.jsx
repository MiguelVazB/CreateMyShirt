import { useEffect, useState, useMemo, lazy, Suspense } from "react";
const Canvas = lazy(() => import("./canvas"));
const Customizer = lazy(() => import("./pages/Customizer"));
import Home from "./pages/Home"; // Don't lazy load Home - it should render immediately
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
  const [currentLoadedDesign, setCurrentLoadedDesign] = useState(null);

  useEffect(() => {
    // Warm up the backend in the background without blocking render
    const warmupBackend = () => {
      fetch(DALLE_API_URL, { signal: AbortSignal.timeout(5000) }).catch(() => {});
    };
    
    // Use requestIdleCallback or setTimeout to avoid blocking initial render
    if ('requestIdleCallback' in window) {
      requestIdleCallback(warmupBackend);
    } else {
      setTimeout(warmupBackend, 1000);
    }
  }, []);

  // Save current design to localStorage
  const saveDesign = (designName, overrideExisting = false) => {
    try {
      const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]');
      
      const design = {
        name: designName,
        timestamp: Date.now(),
        shirtColor,
        textColor,
        isFullTexture,
        isLogoTexture,
        isTextOverlay,
        logoTexture: logoTexture.logo.startsWith('data:') ? logoTexture.logo : null, // Only save base64 images
        textOverlay: textOverlay.startsWith('data:') ? textOverlay : null,
        textPos,
        logoPos,
        generatedImage: generatedImage.startsWith('data:') ? generatedImage : null,
      };

      if (overrideExisting && currentLoadedDesign) {
        // Override the existing design
        const index = savedDesigns.findIndex(d => d.timestamp === currentLoadedDesign.timestamp);
        if (index !== -1) {
          design.timestamp = currentLoadedDesign.timestamp; // Keep original timestamp
          savedDesigns[index] = design;
          try {
            localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns));
            return { success: true, overridden: true };
          } catch (quotaError) {
            return { success: false, error: 'quota' };
          }
        }
      }
      
      // Check if a design with this name already exists
      const duplicate = savedDesigns.find(d => d.name.toLowerCase() === designName.toLowerCase());
      if (duplicate) {
        return { success: false, error: 'duplicate' };
      }

      // Limit to 10 saved designs to prevent quota issues
      if (savedDesigns.length >= 10) {
        return { success: false, error: 'limit' };
      }

      savedDesigns.push(design);
      try {
        localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns));
        setCurrentLoadedDesign(design);
        return { success: true };
      } catch (quotaError) {
        return { success: false, error: 'quota' };
      }
    } catch (error) {
      console.error('Error saving design:', error);
      return { success: false, error: 'unknown' };
    }
  };

  // Load a design from localStorage
  const loadDesign = (design) => {
    setShirtColor(design.shirtColor);
    setTextColor(design.textColor);
    setIsFullTexture(design.isFullTexture);
    setIsLogoTexture(design.isLogoTexture);
    setIsTextOverlay(design.isTextOverlay);
    
    // Load logo texture
    if (design.logoTexture && design.logoTexture.startsWith('data:')) {
      setLogoTexture({ logo: design.logoTexture, logoName: 'Saved Design' });
    }
    
    // Load text overlay
    if (design.textOverlay && design.textOverlay.startsWith('data:')) {
      setTextOverlay(design.textOverlay);
    }
    
    // Load generated image and update logoTexture if it was an AI-generated design
    if (design.generatedImage && design.generatedImage.startsWith('data:')) {
      setGeneratedImage(design.generatedImage);
      // If no separate logo was saved, use the generated image as the logo
      if (!design.logoTexture && design.generatedImage) {
        setLogoTexture({ logo: design.generatedImage, logoName: 'AI' });
      }
    }
    
    setTextPos(design.textPos);
    setLogoPos(design.logoPos);
    setCurrentLoadedDesign(design);
    setIntro(false);
  };

  // Delete a design
  const deleteDesign = (timestamp) => {
    const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]');
    const filtered = savedDesigns.filter(d => d.timestamp !== timestamp);
    localStorage.setItem('savedDesigns', JSON.stringify(filtered));
  };

  // Get all saved designs
  const getSavedDesigns = () => {
    return JSON.parse(localStorage.getItem('savedDesigns') || '[]');
  };

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
    saveDesign,
    loadDesign,
    deleteDesign,
    getSavedDesigns,
    currentLoadedDesign,
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
    currentLoadedDesign,
  ]);

  return (
    <PageContext.Provider value={contextValue}>
      <main>
        <Home />
        <Suspense fallback={
          <div className="loadingCanvas" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '1.2rem'
          }}>
            Loading 3D Canvas...
          </div>
        }>
          <Canvas />
        </Suspense>
        <Customizer />
      </main>
    </PageContext.Provider>
  );
}

export default App;
