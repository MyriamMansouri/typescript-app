import React from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;

const Map: React.FC = () => {
  const [mapState] = React.useState({
    lng: -73.56,
    lat: 45.5,
    zoom: 15.5,
  });

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      style: "mapbox://styles/mapbox/light-v10",
      center: [mapState.lng, mapState.lat],
      zoom: mapState.zoom,
      pitch: 45,
      bearing: -17.6,
      container: "map",
      antialias: true,
    });

    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    map.on("load", function () {
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers!;

      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {


        if (
          layers[i].type === "symbol" /*&&
          layers[i]?.layout["text-field"]*/
        ) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );
    });
  }, [mapState]);

  return (
    <div className="mapWrapper">
      <MapContainer className="map" id="map"></MapContainer>
    </div>
  );
};

const MapContainer = styled.div`
  height: 100vh;
  background-color: "grey";
`;

export default Map;
