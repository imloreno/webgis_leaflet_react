import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  //   Popup,
  TileLayer,
  useMap,
  Tooltip,
  LayersControl,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";

const position: LatLngExpression = [51.505, -0.09];

// Listener, to handle event listeners
const ResizeListener = () => {
  const map = useMap();

  // Event handlers
  const handleResize = (e: any) => {
    console.log(e, "resized");
  };

  // Side effects
  useEffect(() => {
    map.on("zoom", handleResize);
    return () => {
      map.off("zoom", handleResize);
    };
  }, [map]);

  return <></>;
};

const BaseMapContainer = () => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
      preferCanvas={true}
      attributionControl={false}
    >
      <LayersControl position="bottomleft" collapsed={false}>
        <LayersControl.BaseLayer checked name="Light map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Dark map">
          <TileLayer
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}"
            // @ts-ignore
            ext="png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Marker position={position}>
        {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
        <Tooltip direction="top" offset={[-15, -20]} opacity={1}>
          <div
            className="img"
            style={{
              width: "150px",
              height: "150px",
              textAlign: "center",
            }}
          >
            <img
              src="https://images.vexels.com/content/134485/preview/cool-emoji-emoticon-bc7065.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <p style={{ textAlign: "center" }}>
            A pretty CSS3 popup. <br /> Easily customizable.
          </p>
        </Tooltip>
      </Marker>

      <ResizeListener />
    </MapContainer>
  );
};

export default BaseMapContainer;
