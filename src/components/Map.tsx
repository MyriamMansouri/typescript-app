import React from "react";
import { Marker, Popup } from "react-leaflet";
import styled from "styled-components";

const Map: React.FC = () => {
  const [mapState, setMapState] = React.useState({
    center: [51.517327, -0.120005],
    zoom: 15,
  });

  React.useEffect(() => {
    const OSMBuildings = (window as any).OSMBuildings;

    const map = new OSMBuildings({
      container: "map",
      position: { latitude: 45.5016889, longitude: -73.567256 },
      zoom: 16,
      minZoom: 15,
      maxZoom: 20,
      tilt: 30,
      fogColor: "blue",
    });

    map.addMapTiles(
      `https://api.mapbox.com/styles/v1/osmbuildings/cjt9gq35s09051fo7urho3m0f/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
      {
        color: "blue",
        attribution:
          '© Data <a href="http://openstreetmap.org/copyright/">OpenStreetMap</a> · © Map <a href="http://mapbox.com">Mapbox</a>',
      }
    );
 
    map.addGeoJSONTiles(
      "https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json"
    );
    map.addMarker(
      { latitude: 45.5016889, longitude: -73.567256, altitude: 200 },
      { color: 'rgb(0,60,100)'},
      { scale: 1 }
    );
  }, [mapState]);

  return (
    <div className="mapWrapper">
      <LeafletMap className="map" id="map"></LeafletMap>
    </div>
  );
};

const LeafletMap = styled.div`
  height: 100vh;
  background-color: "grey";
`;

export default Map;
