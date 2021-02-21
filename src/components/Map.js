import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Popup from "./Popup";
import FreeFood from "./api/FreeFood.json";
import FreeExercise from "./api/FreeExercise.json";
import FreeMind from "./api/FreeMind.json";
import Switch from "react-switch";
import { FaBeer, FaAppleAlt, FaBrain } from "react-icons/fa";
import DateTimePicker from "react-datetime-picker";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [buttonref, setButtonref] = useState(false);
  const [map, setMap] = useState(null);
  const [maploaded, setMaploaded] = useState(false);
  const [button1, setButton1] = useState("food-layer");
  const [button2, setButton2] = useState("mind-layer");
  const [button3, setButton3] = useState("activity-layer");

  const [colorbutton1, setColorbutton1] = useState("#17a2b8");
  const [fontcolorbutton1, setFontcolorbutton1] = useState("white");
  const [bordercolorbutton1, setBordercolorbutton1] = useState("#17a2b8");

  const [colorbutton2, setColorbutton2] = useState("#17a2b8");
  const [fontcolorbutton2, setFontcolorbutton2] = useState("white");
  const [bordercolorbutton2, setBordercolorbutton2] = useState("#17a2b8");

  const [colorbutton3, setColorbutton3] = useState("#17a2b8");
  const [fontcolorbutton3, setFontcolorbutton3] = useState("white");
  const [bordercolorbutton3, setBordercolorbutton3] = useState("#17a2b8");

  const [startTime, onChangeStart] = useState(new Date());
  const [endTime, onChangeEnd] = useState(new Date());
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
      // {
      //   category: "mind",
      //   "icon-image": "restaurant-noodle-15",
      //   jsondata: FreeMind,
      //   layername: "mind-layer",
      // },
      // {
      //   category: "activity",
      //   "icon-image": "restaurant-noodle-15",
      //   jsondata: FreeExercise,
      //   layername: "activity-layer",
      // },
    ];

    for (const item in categories) {
      let cat = categories[item];
      console.log(cat);
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

  const sidebuttons = [
    {
      num: "button1",
      backcolor: "colourbutton1",
      bordercolor: "bordercolourbutton1",
      fontcolor: "fontcolourbutton1",
    },
    {
      num: "button2",
      backcolor: "colourbutton2",
      bordercolor: "bordercolourbutton2",
      fontcolor: "fontcolourbutton2",
    },
    {
      num: "button3",
      backcolor: "colourbutton3",
      bordercolor: "bordercolourbutton3",
      fontcolor: "fontcolourbutton3",
    },
  ];

  function makeinvisible(val) {
    console.log(val);
    if (buttonref) {
      map.setLayoutProperty(val, "visibility", "none");
      setButtonref(false);
      let backColor = "white";
      let fontColor = "#17a2b8";
      if (val === button1) {
        setColorbutton1(backColor);
        setFontcolorbutton1(fontColor);
      }
      if (val === button2) {
        setColorbutton2(backColor);
        setFontcolorbutton2(fontColor);
      }
      if (val === button3) {
        setColorbutton3(backColor);
        setFontcolorbutton3(fontColor);
      }
    } else {
      map.setLayoutProperty(val, "visibility", "visible");
      setButtonref(true);
      let backColor = "#17a2b8";
      let fontColor = "white";
      console.log("else" + val);
      if (val === button1) {
        setColorbutton1(backColor);
        setFontcolorbutton1(fontColor);
        console.log("val is" + val);
      }
      if (val === button2) {
        setColorbutton2(backColor);
        setFontcolorbutton2(fontColor);
        console.log("val is" + val);
      }
      if (val === button3) {
        setColorbutton3(backColor);
        setFontcolorbutton3(fontColor);
      }
    }
  }

  function isLinkExpiryDateWithinRange(value) {
    // format: mm.dd.yyyy;
    value = value.split(".");
    var todayDate = new Date(),
      endDate = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth() + 6,
        todayDate.getDate() + 1
      );
    let date = new Date(value[2], value[0] - 1, value[1]);

    return todayDate < date && date < endDate;
  }

  function searchByDate() {
    var myObjectList = {
      type: "FeatureCollection",
      features: [{}],
    };
    let newval = FreeFood.features[1];
    let newval2 = FreeFood.features[2];
    myObjectList.features.push(newval);
    myObjectList.features.push(newval2);
    console.log(FreeFood.features[0].properties);
    console.log(isLinkExpiryDateWithinRange("12.24.2012"));
    console.log(startTime);
    let newdata = myObjectList;
    for (const item in FreeFood.features) {
      if (isLinkExpiryDateWithinRange(FreeFood.features[item])) {
        myObjectList.features.push(FreeFood.features[item]);
      }
    }
    map.getSource("food").setData(newdata);
  }

  return (
    <div className="map-container" ref={mapContainerRef}>
      <DateTimePicker
        onChange={onChangeStart}
        value={startTime}
        className="react-datetime-start"
      />
      <DateTimePicker
        onChange={onChangeEnd}
        value={endTime}
        className="react-datetime-end"
      />
      <button className="searchButton" onClick={() => searchByDate()}>
        Select Date
      </button>
      <button
        className="btn btn-info cat-button-1"
        onClick={() => makeinvisible(button1)}
        style={{
          backgroundColor: colorbutton1,
          borderColor: bordercolorbutton1,
          color: fontcolorbutton1,
        }}
      >
        <FaAppleAlt size="2x" />
      </button>
      {/* <button
        className="btn btn-info cat-button-2"
        onClick={() => makeinvisible(button2)}
        style={{
          backgroundColor: colorbutton2,
          borderColor: bordercolorbutton2,
          color: fontcolorbutton2,
        }}
      >
        <FaBrain size="2x" />
      </button> */}
    </div>
  );
};

export default React.memo(Map);
