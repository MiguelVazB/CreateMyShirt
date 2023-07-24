import { useState } from "react";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { PageContext } from "./context/PageContext";

function App() {
  const [hello, setHello] = useState("hello");
  return (
    <PageContext.Provider value={{ hello, setHello }}>
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
