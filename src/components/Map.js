import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Popup from "./Popup";
import FreeFood from "./api/FreeFood.json";
import Switch from "react-switch";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [buttonref, setButtonref] = useState(true);
  const [map, setMap] = useState(null);
  const [button1, setButton1] = useState("food-layer");
  const [colourbutton, setColourbutton] = useState("button-colour");
  const [fontcolourbutton, setFontcolourbutton] = useState(
    "font-button-colour"
  );
  const [bordercolourbutton, setBordercolourbutton] = useState(
    "border-button-colour"
  );
  // initialize map when component mounts

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-75.65494537353516, 45.43267179295816],
      zoom: 12,
      maxZoom: 15,
      minZoom: 12,
    });
    setMap(map);
    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    let categories = [
      {
        category: "food",
        "icon-image": "restaurant-noodle-15",
        jsondata: FreeFood,
        layername: "food-layer",
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
      setColourbutton("white");
      setBordercolourbutton("#17a2b8");
      setFontcolourbutton("#17a2b8");
    } else {
      map.setLayoutProperty(val, "visibility", "visible");
      setButtonref(true);
      setColourbutton("#17a2b8");
      setFontcolourbutton("white");
    }
  }

  return (
    <div className="map-container" ref={mapContainerRef}>
      <button
        className="btn btn-info cat-button-2"
        onClick={() => makeinvisible(button1)}
        style={{
          backgroundColor: colourbutton,
          borderColor: bordercolourbutton,
          color: fontcolourbutton,
        }}
      >
        Button 1
      </button>
    </div>
  );
};

export default React.memo(Map);
