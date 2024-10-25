import { useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup, Circle } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import useLayerStore from "../store";

import { EditControl } from "react-leaflet-draw";
import { getTheme } from "../constants";
import Marker from "./Map/Marker";
import GEOJson from "./Map/GEOJson";

const position: LatLngExpression = [51.8890863499512, 9.73459975132488];

const BaseMapContainer = () => {
  const {
    states,
    capitals,
    fetchStates,
    fetchCapitals,
    disabledIds,
    theme,
    loading,
  } = useLayerStore();
  const disabledCapitals = disabledIds.capitals || [];
  const disabledStates = disabledIds.states || [];

  useEffect(() => {
    fetchStates();
    fetchCapitals();
  }, [fetchStates, fetchCapitals]);

  const mapTheme = getTheme(theme);

  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
      preferCanvas={true}
      attributionControl={false}
    >
      <TileLayer {...mapTheme.mapProps} />
      {capitals.length > 0 || loading ? (
        capitals
          .filter((capital) => !disabledCapitals.includes(capital.id))
          // @ts-ignore
          .map(({ id, name, location: { coordinates } }) => {
            return (
              <Marker key={id} id={id} name={name} coordinates={coordinates} />
            );
          })
      ) : (
        <p>Cargando...</p>
      )}

      {states.length > 0 || loading ? (
        states
          .filter((state) => !disabledStates.includes(state.id))
          .map(({ id, name, area, geometry }) => {
            return (
              // @ts-ignore
              <GEOJson
                key={id}
                id={id}
                name={name}
                area={area}
                geometry={geometry}
              />
            );
          })
      ) : (
        <p>Cargando...</p>
      )}

      <FeatureGroup>
        <EditControl
          position="topright"
          onEdited={() => {}}
          onCreated={(e) => {
            console.log(e);
          }}
          onDeleted={() => {}}
          draw={{
            rectangle: false,
          }}
        />
        <Circle center={[51.51, -0.06]} radius={200} />
      </FeatureGroup>
    </MapContainer>
  );
};

export default BaseMapContainer;
