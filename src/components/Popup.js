import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Popup = ({ feature }) => {
  const {
    id,
    name,
    description,
    location,
    time,
    facebooklink,
    instalink,
  } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Where : {location}</p>
      <p>When : {time}</p>
      <a
        href="https://www.facebook.com/learnbuildteach/"
        className="facebook social"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href={facebooklink} className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href={instalink} className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
};

export default Popup;
