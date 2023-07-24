import { useState } from "react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { PageContext } from "./context/PageContext";

function App() {
  const [intro, setIntro] = useState(true);
  return (
    <PageContext.Provider value={{ intro: intro }}>
      <main>
        <h1>Create My Shirt</h1>
        <Home />
        <Canvas />
        <Customizer />
      </main>
    </PageContext.Provider>
  );
}

export default App;
