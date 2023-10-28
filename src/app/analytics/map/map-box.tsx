import { Globe, Map } from "lucide-react";
import { FunctionComponent } from "react";

interface MapButtonBoxProps {
  mapStyle: string;
  toggleMapStyle: () => void;
}

export const MapButtonBox: FunctionComponent<MapButtonBoxProps> = ({
  mapStyle,
  toggleMapStyle,
}) => {
  return (
    <div
      className="m-1 mapboxgl-ctrl mapboxgl-ctrl-group p-1"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <button
        title={
          mapStyle === "global"
            ? "Disable global map"
            : "Enable global map"
        }
        onClick={toggleMapStyle}
      >
        {mapStyle === "global"
            ? <Map size={"sm"}/>
            : <Globe size={"sm"} />}
        <Globe size={"sm"} />
      </button>
    </div>
  );
};
