import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  // Popup,
  TileLayer,
  useMap,
  Tooltip,
  GeoJSON,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import useLayerStore from "../store";

import L from "leaflet";

const position: LatLngExpression = [51.8890863499512, 9.73459975132488];

// Listener, to handle event listeners
const ResizeListener = () => {
  const map = useMap();

  // Event handlers
  const handleResize = (e: any) => {
    // console.log(e, "resized");
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
  const {
    states,
    capitals,
    fetchStates,
    fetchCapitals,
    loading,
    error,
    disabledIds,
  } = useLayerStore();
  const disabledCapitals = disabledIds.capitals || [];
  const disabledStates = disabledIds.states || [];

  useEffect(() => {
    fetchStates();
    fetchCapitals();
  }, [fetchStates, fetchCapitals]);

  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
      preferCanvas={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {capitals.map((capital) => {
        return (
          <Marker
            key={capital.id}
            position={[
              // @ts-ignore
              capital?.location?.coordinates[1] || 0,
              // @ts-ignore
              capital?.location?.coordinates[0] || 0,
            ]}
          >
            <Tooltip>
              <p>
                <b>ID: </b>
                {capital?.id}
              </p>
              <p>
                <b>Capital: </b>
                {capital?.name}
              </p>
            </Tooltip>
          </Marker>
        );
      })}
      {states.length > 0 &&
        states
          .filter((state) => !disabledStates.includes(state.id))
          .map((state) => {
            return (
              // @ts-ignore
              <GeoJSON key={state.id} data={state.geometry} key={state.id}>
                <Tooltip direction="top" offset={[0, -20]}>
                  <p>
                    <b>ID: </b>
                    {state?.id}
                  </p>
                  <p>
                    <b>Estado: </b>
                    {state?.name}
                  </p>
                  <p>
                    <b>Superficie: </b>
                    {state?.area} msnm.
                  </p>
                </Tooltip>
              </GeoJSON>
            );
          })}

      <ResizeListener />
    </MapContainer>
  );
};

export default BaseMapContainer;
