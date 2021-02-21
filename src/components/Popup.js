import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGlobe, FaAddressBook } from "react-icons/fa";
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
    website,
  } = feature.properties;

  return (
    <div id={`popup-${id}`} className="popup">
      <h3>{name}</h3>
      <h4>{description}</h4>
      <p>
        <b>Where : </b>
        {location}
      </p>
      <p>
        <b>When : </b>
        {time}
      </p>
      <div className="popup-links">
        <a href={website} className="internet social">
          <FaGlobe size={36} />
        </a>
        <a href={facebooklink} className="facebook social">
          <FontAwesomeIcon icon={faFacebook} size="3x" />
        </a>
        <a href={instalink} className="instagram social">
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </a>
      </div>
    </div>
  );
};

export default Popup;
