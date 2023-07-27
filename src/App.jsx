import { useState } from "react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { PageContext } from "./context/PageContext";

function App() {
  const [intro, setIntro] = useState(true);
  return (
    <PageContext.Provider value={{ intro: intro, setIntroFunc: setIntro }}>
      <main>
        <Home />
        <Customizer />
        <Canvas />
      </main>
    </PageContext.Provider>
  );
}

export default App;
