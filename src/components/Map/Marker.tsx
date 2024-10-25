import { LatLngExpression } from "leaflet";
import { Marker as Mark, Tooltip } from "react-leaflet";

const Marker = ({
  id,
  name,
  coordinates,
}: {
  id: number;
  name: string;
  coordinates: LatLngExpression;
}) => {
  return (
    <Mark
      key={id}
      position={[
        // @ts-ignore
        coordinates[1] || 0,
        // @ts-ignore
        coordinates[0] || 0,
      ]}
    >
      <Tooltip>
        <p>
          <b>ID: </b>
          {id}
        </p>
        <p>
          <b>Capital: </b>
          {name}
        </p>
      </Tooltip>
    </Mark>
  );
};

export default Marker;
