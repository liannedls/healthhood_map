import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Popup from "./Popup";
import GeoJsonVal1 from "./api/GeoJson1.json";
import GeoJsonVal2 from "./api/GeoJson2.json";
import GeoJsonVal3 from "./api/GeoJson3.json";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [buttonref, setButtonref] = useState(true);
  const [map, setMap] = useState(null);
  const [button1, setButton1] = useState("health-layer");
  const [button2, setButton2] = useState("food-layer");
  const [button3, setButton3] = useState("mind-layer");
  // initialize map when component mounts

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-75.65494537353516, 45.43267179295816],
      zoom: 11,
      maxBounds: [
        [-76.072173, 45.052915],
        [-75.289848, 45.673931],
      ],
    });
    setMap(map);
    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    let categories = [
      {
        category: "health",
        "icon-image": "airfield-15",
        jsondata: GeoJsonVal1,
        layername: "health-layer",
      },
      {
        category: "food",
        "icon-image": "restaurant-noodle-15",
        jsondata: GeoJsonVal2,
        layername: "food-layer",
      },
      {
        category: "mind",
        "icon-image": "hospital-15",
        jsondata: GeoJsonVal3,
        layername: "mind-layer",
      },
    ];

    for (const item in categories) {
      let cat = categories[item];
      console.log(cat.jsondata);
      map.on("load", () => {
        // add the data source for new a feature collection with no features
        map.addSource(cat.category, {
          type: "geojson",
          data: cat.jsondata,
        });
        // now add the layer, and reference the data source above by name
        map.addLayer({
          id: cat.layername,
          source: cat.category,
          type: "symbol",
          layout: {
            // full list of icons here: https://labs.mapbox.com/maki-icons
            "icon-image": cat["icon-image"], // this will put little croissants on our map
            "icon-padding": 0,
            "icon-allow-overlap": true,
            visibility: "visible",
          },
        });
      });

      map.on("moveend", async () => {
        // get new center coordinates
        const { lng, lat } = map.getCenter();
        // fetch new data
        //const results = await fetchFakeData({ longitude: lng, latitude: lat });
        // update "random-points-data" source with new data
        // all layers that consume the "random-points-data" data source will be updated automatically
        map.getSource(cat.category).setData(cat.jsondata);
      });

      // change cursor to pointer when user hovers over a clickable feature
      map.on("mouseenter", cat.layername, (e) => {
        if (e.features.length) {
          map.getCanvas().style.cursor = "pointer";
        }
      });

      // reset cursor to default when user is no longer hovering over a clickable feature
      map.on("mouseleave", cat.layername, () => {
        map.getCanvas().style.cursor = "";
      });

      // add popup when user clicks a point
      map.on("click", cat.layername, (e) => {
        if (e.features.length) {
          const feature = e.features[0];
          // create popup node
          const popupNode = document.createElement("div");
          ReactDOM.render(<Popup feature={feature} />, popupNode);
          // set popup on map
          popUpRef.current
            .setLngLat(feature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map);
        }
      });
    }

    return () => map.remove();
  }, []);

  function makeinvisible(val) {
    //setButtonref(!buttonref);
    console.log(val);
    if (buttonref) {
      map.setLayoutProperty(val, "visibility", "none");
      setButtonref(false);
    } else {
      map.setLayoutProperty(val, "visibility", "visible");
      setButtonref(true);
    }
  }

  return (
    <div className="map-container" ref={mapContainerRef}>
      <button className="cat-button-1" onClick={() => makeinvisible(button1)}>
        Button 1
      </button>
      <button className="cat-button-2" onClick={() => makeinvisible(button2)}>
        Button 2
      </button>
      <button className="cat-button-3" onClick={() => makeinvisible(button3)}>
        Button 3
      </button>
    </div>
  );
};

export default React.memo(Map);
