import MapVisor from "./components/MapVisor";
import Menu from "./components/Menu";

function App() {

  return (
    <main className="main-container">
      <div className="container">
        <MapVisor></MapVisor>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </main>
  );
}

export default App;
