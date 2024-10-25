import { useRef, useState } from "react";
import MapVisor from "./components/MapVisor";
import Menu from "./components/Menu";
import useLayerStore from "./store";
import { Theme } from "./constants";
import IconButton from "./components/Buttons/IconButton";

function App() {
  const mapRef = useRef(null);
  const { setTheme, theme } = useLayerStore();
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Button handlers
  const handleFullScreen = () => {
    if (!isFullScreen) {
      mapRef?.current?.requestFullscreen().catch((err: any) => {
        console.error(err);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  const handleTheme = () => {
    if (theme === Theme.dark) {
      setTheme(Theme.light);
    } else {
      setTheme(Theme.dark);
    }
  };

  return (
    <main
      className="main-container"
      style={{
        backgroundColor:
          theme === Theme.dark ? "#242424" : "rgba(255, 255, 255, 0.87)",
        color: theme === Theme.dark ? "rgba(255, 255, 255, 0.87)" : "#242424",
      }}
    >
      <div className="container" style={{ position: "relative" }} ref={mapRef}>
        <MapVisor></MapVisor>
        <div className="icon-list">
          <IconButton
            iconUrl="https://static-00.iconduck.com/assets.00/dark-theme-icon-512x512-185rlszm.png"
            onClick={handleTheme}
            alt="Switch theme"
          />

          <IconButton
            iconUrl="https://cdn-icons-png.freepik.com/512/8373/8373465.png"
            onClick={handleFullScreen}
            alt="Full Screen"
          />
        </div>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </main>
  );
}

export default App;
