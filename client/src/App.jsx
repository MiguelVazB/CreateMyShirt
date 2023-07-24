import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";

function App() {
  return (
    <main>
      <h1>Create My Shirt</h1>
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
}

export default App;
