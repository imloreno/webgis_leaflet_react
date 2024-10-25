import { Tooltip, GeoJSON as GEOJsonContainer } from "react-leaflet";

interface GEOJsonProps {
  id: number;
  name: string;
  area: number | undefined;
  geometry: any;
}

const GEOJson = ({ id, geometry, name, area }: GEOJsonProps) => {
  return (
    <GEOJsonContainer key={id} data={geometry}>
      <Tooltip direction="top" offset={[0, -20]}>
        <div
          className="img"
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <img
            src="https://clipart-library.com/images_k/world-map-silhouette-vector/world-map-silhouette-vector-19.png"
            alt=""
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
        </div>
        <p>
          <b>ID: </b>
          {id}
        </p>
        <p>
          <b>Estado: </b>
          {name}
        </p>
        <p>
          <b>Superficie: </b>
          {area} msnm.
        </p>
      </Tooltip>
    </GEOJsonContainer>
  );
};

export default GEOJson;
