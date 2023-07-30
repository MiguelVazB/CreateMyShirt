import { useState } from "react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { PageContext } from "./context/PageContext";

function App() {
  const [intro, setIntro] = useState(true);
  const [isFullTexture, setIsFullTexture] = useState(false);
  const [isLogoTexture, setIsLogoTexture] = useState(true);
  const [shirtColor, setShirtColor] = useState("chocolate");
  const [logoTexture, setLogoTexture] = useState("./threejsLogo.png");

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
