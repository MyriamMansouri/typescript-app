import React from "react";
import styled from "styled-components";

const Map: React.FC = () => {
  const [mapState, setMapState] = React.useState({
    center: [51.517327, -0.120005],
    zoom: 15,
  });

  React.useEffect(() => {

    const OSMBuildings = (window as any).OSMBuildings;

    const map = new OSMBuildings({
      container: 'map',
      position: { latitude: 45.5016889, longitude: 	-73.567256 },
      zoom: 16,
      minZoom: 15,
      maxZoom: 20,
      attribution: '© Map and Data <a href="http://osm.org/copyright">OpenStreetMap</a> contributors © 3D <a href="https://osmbuildings.org/copyright/">OSM Buildings</a>'
    });
    
    map.addMapTiles(`https://api.mapbox.com/styles/v1/osmbuildings/cjt9gq35s09051fo7urho3m0f/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
    
    map.addGeoJSONTiles('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');
  }, [mapState]);

  return (
    <div className="mapWrapper">
      <LeafletMap className="map" id="map"></LeafletMap>
    </div>
  );
};

const LeafletMap = styled.div`
  height: 100vh;
`;
export default Map;
